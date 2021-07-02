const Router = require('koa-router');
const path = require('path');

const { nanoid } = require('nanoid/async');
const sharp = require('sharp');
const crypto = require('crypto');
const koaBody = require('koa-body')({ multipart: true, multiples: false, keepExtensions: true });


const User = require('../models/user');
const Oauth2 = require('../models/oauth2');

const jwt = require('../middleware/jwt');
const permController = require('../middleware/permController');
const validateAuthRoutes = require('../middleware/validateRoutePostSchema/validateAuthRoutes');

const sendMailMessage = require('../utils/sendMailMessage');
const profaneCheck = require('../utils/profaneCheck');
const knex = require('../utils/knexUtil');
const log = require('../utils/logger');
const s3 = require('../utils/s3Util');
const {
  createPasswordHash,
  getProfileImage
} = require('../utils/routesUtils/userRouteUtils');
const {
  profileCompleteBoolean,
  inviteUserAward,
} = require('../utils/awards/awards');

const router = new Router({
  prefix: '/users'
});

const DOMAIN_NAME = process.env.DOMAIN_NAME || 'http://localhost:4200';

const sendVerificationEmail = async (user, email) => {
  const token = crypto.randomBytes(64).toString('hex');
  const buf = Buffer.from(email, 'ascii').toString('base64');

  const userData = await user.$query().patchAndFetch({
    'resetPasswordExpires': new Date(+new Date() + 1.8e6),
    'resetPasswordToken': token,
  });
  // sending email
  const link = `${DOMAIN_NAME}/verify?email=${buf}&token=${token}`;
  await sendMailMessage(buf, userData.username, link, 'confirm-email', 'Welcome to Wikonnect! Please confirm your email');
  log.info('Email verification sent to %s', email);

  return userData;
};


/**
* @api {post} /api/v1/users POST create a new user.
* @apiName PostAUser
* @apiGroup Authentication
*
* @apiParam {string} user[username] username
* @apiParam {string} user[email] Unique email
* @apiParam {string} user[password] validated password
* @apiParam {string} user[invitedBy] optional auto filled on the form
*
* @apiPermission none
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*        "user": {
*          "id": "string",
*          "username": "string",
*          "inviteCode": "inviteCode",
*          "createdAt": "string",
*          "updatedAt": "string",
*          "metadata": "json_array"
*        }
*     }
*
* @apiError {String} errors Bad Request.
*/

router.post('/', validateAuthRoutes.validateNewUser, createPasswordHash, async ctx => {
  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();
  ctx.request.body.user.email = ctx.request.body.user.email.toLowerCase();
  ctx.request.body.user.metadata = { 'profileComplete': 'false', 'oneInviteComplete': 'false' };

  const invitedBy = ctx.request.body.user.inviteCode;

  let newUser = ctx.request.body.user;
  newUser.inviteCode = await nanoid(11);
  newUser.lastIp = ctx.request.ip;

  const userCheck = await User.query();
  let role = !userCheck.length ? 'groupAdmin' : 'groupBasic';

  delete newUser.profileUri; //avoids external profile links at the moment

  try {
    const user = await User.query().insertAndFetch(newUser);
    await knex('group_members').insert({ 'user_id': user.id, 'group_id': role });
    await knex('user_invite').insert([{ 'invited_by': invitedBy, user_id: user.id }], ['id', 'invited_by', 'user_id']);
    inviteUserAward(invitedBy);

    log.info('Created a user with id %s with username %s with the invite code %s', user.id, user.username, user.inviteCode);
    sendVerificationEmail(user, ctx.request.body.user.email);

    ctx.status = 201;
    ctx.body = { user };
  } catch (e) {
    if (e.constraint === 'users_email_unique') {
      await Oauth2.query().where({ email: newUser.email });
      e.detail = 'Account already created using Google';
    }
    log.error('Failed for user - %s, with error %s', ctx.request.body.user.email, e.message, e.detail);
    ctx.throw(400, null, { errors: [e] });
  }


});


/**
 * @api {get} /api/v1/users/:id GET a single user using id.
 * @apiName GetAUser
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription list a single user on the platform
 * @apiPermission [admin, superadmin]
 * @apiHeader {String} authorization Users unique JWT
 *
 * @apiParam {string} id The users id
 *
 * @apiSampleRequest https://localhost:3000/api/v1/users
 *
 * @apiSuccess {String} id Unique user id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "user": {
 *       "id": "user2",
 *       "username": "user2",
 *       "createdAt": "2017-12-20T16:17:10.000Z",
 *       "updatedAt": "2017-12-20T16:17:10.000Z",
 *       "profileUri": "image_url",
 *       "flag": false,
 *       "private": boolean,
 *       "inviteCode": "invited_by",
 *       "achievementAwards": [
 *         {
 *           "id": "achievementaward1",
 *           "name": "completed 10 courses",
 *           "type": "achievementAwards"
 *         },
 *         {
 *           "id": "achievementaward2",
 *           "name": "fully filled profile",
 *           "type": "achievementAwards"
 *         }
 *       ],
 *       "userRoles": [
 *         {
 *           "id": "4hsuh4"
 *           "type": "userRole"
 *         }
 *       ],
 *       "enrolledCourses": [
 *          {
 *            "id": "course1",
 *            "name": "A Course 1",
 *            "type": "course"
 *          }
 *       ],
 *       "userVerification": []
 *    }
 * }
 *
 * @apiErrorExample
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": 401,
 *      "message": "You do not have permissions to view that user"
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": 404,
 *      "message": "No User With that Id"
 *    }
 */

router.get('/:id', permController.requireAuth, async ctx => {

  let stateUserId = ctx.state.user.id === undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let userId = (ctx.params.id !== 'current' || ctx.params.id !== 'me') ? ctx.params.id : stateUserId;

  let joinRelations = 'achievementAwards(selectBadgeNameAndId), userRoles(selectNameAndId),' +
    'enrolledCourses(selectNameAndId)';
  if (ctx.query && ctx.query.include) {
    const includes = ctx.query.include.split(',');
    if (includes.some((v) => v.toLowerCase().includes('following'))) {
      joinRelations += ',following(selectBasicInfo)';
    }
    if (includes.some((v) => v.toLowerCase().includes('followers'))) {
      joinRelations += ',followers(selectBasicInfo)';
    }
  }

  let user = await User.query()
    .findById(userId)
    .withGraphFetched(`[${joinRelations}]`);

  ctx.assert(user, 404, 'No User With that Id');
  user.profileUri = await getProfileImage(user);
  profileCompleteBoolean(user, ctx.params.id);
  log.info('Got a request from %s for %s', ctx.request.ip, ctx.path);


  user = user.toJSON();
  if (stateUserId !== userId) {
    delete user.email;
    delete user.username;
    delete user.updatedAt;
    delete user.contactNumber;
  }

  ctx.status = 200;
  ctx.body = { user };
});
/**
 * @api {get} /users GET all users.
 * @apiName GetUsers
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription list all user on the platform
 * @apiPermission admin, moderator, or basic
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 * @apiParam (Query Params) {String}   [id]  Get a user with a specified id
 * @apiParam (Query Params) {String}   [username] Get a user with a specified username
 * @apiParam (Query Params) {String}   [email]  Get a user with a specified email
 * @apiParam (Query Params) {String}   [lastIp]   <strike>filter users based on their last recorded IP address</strike>
 * @apiParam (Query Params) {String}   [inviteCode]  Get a user with a specified inviteCode
 * @apiParam (Query Params) {Boolean}  [private]
 * @apiParam (Query Params) {String}   [location]  filter users based on location
 * @apiParam (Query Params) {String}   [gender]  filter users based on their gender
 * @apiParam (Query Params) {String}   [contactNumber]  <strike>filter users based on contact number</strike>
 * @apiParam (Query Params) {String}   [aggregate] Aggregates to include separated with comma (userFollowers,enrolledCourses,followedTags,approvedchapters,publishedcourses)
 * @apiParam (Query Params) {String}   [include] Relations to include seperated with comma (userfollowees)
 * @apiParam (Query Params) {String}   [followerId] User Id which to filter user-followees for. The include query param must request `userfollowees` e.g. /?include=userfollowees&followerId=user1
 *
 *  {
 *    "users":[
 *              {
 *                  "id": "user1",
 *                   "name": "user1"
 *                  "email": "user1@wikonnect.org",
 *                  "username": "user1",
 *                  "lastSeen": "2021-07-02T04:31:52.718Z",
 *                  "metadata":{"profileComplete": "true", "oneInviteComplete": "false", "oneChapterCompletion": "false"},
 *                  "createdAt": "2017-12-20T19:17:10.000Z",
 *                  "updatedAt": "2021-07-01T16:09:58.303Z",
 *                  "profileUri": "/uploads/images/profile-placeholder.gif",
 *                  "inviteCode": "user1",
 *                  "private": "true",
 *                  "tags": "{\"highschool\",\"primary\",\"university\"}",
 *                  "emailVerified": false,
 *                  "phoneVerified": false,
 *                  "flag": false,
 *                  "location": "Huntington, Malawi",
 *                  "contactNumber": "+549900080861",
 *                  "gender": "N/A",
 *                  totalUserFollowers": "2",
 *                  "totalCoursesEnrolled": "5",
 *                  "totalTagsFollowed": "1",
 *                  "totalChaptersPublished": "1",
 *                  "totalChaptersApproved": "5",
 *                  "achievementAwards":[{"id": "JDKOZASAADo", "name": "longest streak", "achievementId": "achievements1",…],
 *                  "userRoles":[{"id": "groupAdmin", "name": "admin", "slug": "role-admin",…],
 *                  "enrolledCourses":[{"id": "JDKOY80AA7A", "name": "culpa nihil cumque", "type": "course"…],
 *                  "userFollowees":[{"id": "JDKOY-uAACc", "userId": "user1", "followingId": "JDKOYwqAAZw",…] *
 *              }
 *    ]
 *  }
 *
 */
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'private'),
  async ctx => {

    let recordsToSelect = ['*'];
    if (ctx.query.aggregate) { //not best approach but fine for now
      const possibleAggregates = [
        {
          expect: 'userfollowers', //expected query
          selectQuery: User.relatedQuery('userFollowers').count().as('totalUserFollowers') //
        },
        {
          expect: 'enrolledcourses',
          selectQuery: User.relatedQuery('courseEnrollments').count().as('totalCoursesEnrolled')
        },
        {
          expect: 'followedtags',
          selectQuery: User.relatedQuery('tagsFollowing').count().as('totalTagsFollowed')
        },
        {
          expect: 'approvedchapters',
          selectQuery: User.relatedQuery('chapters')
            .where('approved', true).count().as('totalChaptersApproved')
        }, {
          expect: 'publishedcourses',
          selectQuery: User.relatedQuery('courses')
            .where('status', 'published').count().as('totalChaptersPublished')
        },

      ];

      const includes = ctx.query.aggregate.split(',');

      includes.map((qr) => {
        const obj = possibleAggregates.find((p) => qr.toLowerCase().includes(p.expect));
        if (obj) {
          recordsToSelect.push(obj.selectQuery);
        }
      });
    }

    let queryUserFollowees = false;
    if (ctx.query.include) {
      const includes = ctx.query.include.split(',');
      if (includes.some((v) => v.toLowerCase().includes('userfollowees'))) {
        queryUserFollowees = true;
      }
    }
    const followerId = ctx.query.followerId; // handy with userFollowees filter

    delete ctx.query.followerId;
    delete ctx.query.aggregate;
    delete ctx.query.include;

    try {
      let users = await User.query()
        .select(recordsToSelect)
        .where(ctx.query)
        .withGraphFetched('[achievementAwards(selectBadgeNameAndId), userRoles(),' +
          ' enrolledCourses(selectNameAndId)]')
        .onBuild((builder) => {
          if (queryUserFollowees) {
            builder.withGraphFetched('userFollowees');
          }
        })
        .modifyGraph('userFollowees', (query) => {
          if (followerId) {
            query.where('following_id', followerId);
          }
        });

      ctx.assert(users, 404, 'No User With that username');

      ctx.body = { users };
    } catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      } else { ctx.throw(406, null, { errors: [e.message] }); }
    }

  });

/**
 * @api {put} /users/:id PUT users data.
 * @apiName PutAUser
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription edit users data on the platform
 * @apiPermission [admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 * @apiParam (PUT Params) {string} user[email] Unique email
 * @apiParam (PUT Params) {string} user[password] validated password
 * @apiParam (PUT Params) {string} user[tags] a list of String with tags a user has subscribed to
 * @apiParam (PUT Params) {string} user[metadata] json data
 *
 * @apiSuccess {String} user[object] Object data
 *
 */

router.put('/:id', jwt.authenticate, permController.requireAuth, async ctx => {
  let { metadata, ...data } = ctx.request.body.user;

  //  check for profane language in user bios
  if (metadata.aboutMe) {
    const checked = await profaneCheck(metadata.aboutMe);
    console.log(metadata.aboutMe);
    if (typeof checked != 'undefined' && checked) {
      ctx.throw(401, `Mind you language - ${checked}`, { errors: `Mind you language - ${checked}` });
    }
  }

  //  update json_b metadata without deleting existing content
  if (metadata) {
    for (let key in metadata) {
      data[`metadata:${key}`] = metadata[key];
    }
  }

  delete data.profileUri; //avoids external profile links at the moment

  const user = await User.query().patchAndFetchById(ctx.params.id, data);
  ctx.assert(user, 404, 'That user does not exist.');

  profileCompleteBoolean(user, ctx.params.id);

  ctx.status = 200;
  ctx.body = { user };

});

router.post('/invite/:id', async ctx => {
  const invite = await knex('user_invite').insert([{ user_id: ctx.params.id, 'invited_by': ctx.request.body.user.inviteBy }], ['id', 'invited_by', 'user_id']);
  ctx.assert(invite, 404, 'That user does not exist.');

  inviteUserAward(ctx.params.id);

  ctx.status = 200;
  ctx.body = { invite };

});

/**
 * @api {post} /users/:id/profile-image POST users profile picture.
 * @apiName PostAUser
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription upload user profile pic
 * @apiPermission [basic, admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 *
 * @apiError {String} errors Bad Request.
 */

router.post('/:id/profile-image', koaBody, permController.requireAuth, async (ctx) => {

  ctx.assert(ctx.request.files.file, 400, 'No file image uploaded');

  const fileNameBase = await nanoid(11);
  const uploadPath = 'uploads/images/profile';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  const { file } = ctx.request.files;

  const fileExtension = path.extname(file.name);

  if (!['.webp', '.svg', '.png', '.jpeg', '.gif', '.avif', '.jpg'].includes(fileExtension)) {
    ctx.throw(400, { error: 'Image format not supported' });
  }

  let resizer;
  try {
    resizer = await sharp(file.path)
      .resize(500, 500)
      .jpeg({ quality: 70 });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(500, null, { errors: [e.message] });
    }
  }


  if (s3.config) {
    let buffer = await resizer.toBuffer();
    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `uploads/profiles/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
    };

    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();
      log.info('Uploaded in:', uploaded.Location);
      const user = await User.query().patchAndFetchById(ctx.params.id, { profileUri: fileNameBase });

      user.profileUri = 'data:image/(png|jpg);base64,' + buffer.toString('base64'); //since s3 will not alter the image

      ctx.body = { user };
    } catch (e) {
      log.error(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }
  }

  else {
    try {
      await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);
      const user = await User.query()
        .patchAndFetchById(ctx.params.id, { profileUri: `/${uploadPath}/${fileNameBase}.jpg` });

      ctx.status = 200;
      ctx.body = { user };
    } catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, null, { errors: [e.message] });
      } else {
        ctx.throw(400, null, { errors: [e.message] });
      }
    }
  }
});

/**
 * @api {post} /api/v1/users/verify POST user's email to validate.
 * @apiName PostLoginAUserEmail
 * @apiGroup Authentication
 *
 * @apiParam {string} user[email] emailAddress
 *
 * @apiPermission basic
 * @apiSampleRequest https://localhost:3000/api/v1/users/verify
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "user":{
 *          "email": "emailAddress",
 *          "emailVerified": "true",
 *        }
 *     }
 *
 * @apiError {String} errors Bad Request.
 */

router.post('/verify', permController.requireAuth, async ctx => {
  const email = ctx.request.body.user.email;
  const user = await User.query().findOne({ 'email': email, 'emailVerified': false });
  ctx.assert(user, 404, user);

  try {
    const userData = sendVerificationEmail(user, email);
    ctx.status = 201;
    ctx.body = userData;

  } catch (e) {
    log.info('Email verification already requested');
    if (e.statusCode) {
      ctx.throw(e.statusCode, e, { errors: [e.message] });
    } else { ctx.throw(400, e, { errors: [e.message] }); }
    throw e;
  }
});

/**
 * @api {get} /api/v1/users/verify Validate a users email.
 * @apiName ValidateAUsersEmail
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription Validate a users email using token sent via email
 * @apiPermission [admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 * @apiParam (Required Params) {string} user[token] username
 * @apiParam (Required Params) {string} user[email] Unique email
 *
 */

router.get('/:id/verify', permController.requireAuth, async ctx => {
  const decodedMail = Buffer.from(ctx.query.email, 'base64').toString('ascii');
  const token = ctx.query.token;
  let user = await User.query().findOne({ 'email': decodedMail, 'resetPasswordToken': token });
  ctx.assert(user, 404, 'No email found');
  let verifiedData;
  if (new Date() < user.resetPasswordExpires) {
    try {
      verifiedData = await user.$query().patchAndFetch({
        'emailVerified': true,
        'resetPasswordExpires': new Date(),
        'resetPasswordToken': null
      });
      ctx.status = 200;
      ctx.body = { verifiedData };
    } catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, e, { errors: [e.message] });
      } else { ctx.throw(400, e, { errors: [e.message] }); }
      throw e;
    }

  } else {
    log.info('Email verification has expired');
    throw new Error('Email verification has expired');
  }

});

module.exports = router.routes();
