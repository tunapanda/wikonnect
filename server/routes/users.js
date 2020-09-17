const Router = require('koa-router');
const bcrypt = require('bcrypt');
const path = require('path');

const busboy = require('async-busboy');
const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');
const { updatedAt } = require('../utils/timestamp');

const User = require('../models/user');
const AchievementAward = require('../models/achievement_awards');

const log = require('../utils/logger');
const jwt = require('../middleware/jwt');
const permController = require('../middleware/permController');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);



const router = new Router({
  prefix: '/users'
});

async function achievementAwardsType(parent) {
  try {
    if (parent.length == undefined) {
      parent.achievementAwards.forEach(award => {
        return award.type = 'achievementAward';
      });
    } else {
      parent.forEach(mod => {
        mod.achievementAwards.forEach(award => {
          return award.type = 'achievementAward';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}

async function userRoles(parent) {
  try {
    if (parent.length == undefined) {
      parent.userRoles.forEach(role => {
        return role.type = 'userRoles';
      });
    } else {
      parent.forEach(roles => {
        roles.userRoles.forEach(role => {
          return role.type = 'userRoles';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}

async function enrolledCoursesType(parent) {
  try {
    if (parent.length == undefined) {
      parent.enrolledCourses.forEach(lesson => {
        return lesson.type = 'course';
      });
    } else {
      parent.forEach(mod => {
        mod.enrolledCourses.forEach(lesson => {
          return lesson.type = 'course';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}


function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

async function getProfileImage(id) {

  try {
    if (s3.config) {
      const params = {
        Bucket: s3.config.bucket, // pass your bucket name
        Key: `uploads/profiles/${id}.jpg`, // key for saving filename
      };

      const getImage = await s3.s3.getObject(params).promise();
      let image = 'data:image/(png|jpg);base64,' + encode(getImage.Body);
      return image;
    } else {
      return 'images/profile-placeholder.gif';
    }
  } catch (e) {
    return 'images/profile-placeholder.gif';
  }
}
async function createPasswordHash(ctx, next) {
  if (ctx.request.body.user.password) {
    const hash = await bcrypt.hash(ctx.request.body.user.password, 10);

    delete ctx.request.body.user.password;
    ctx.request.body.user.hash = hash;
  }
  await next();
}

async function profileCompleteBoolean(params) {
  const keys = ['profileUri', 'email'];
  keys.forEach((key, index) => {
    if (params[key] != null) {
      log.info(index);
      return 'false';
    } else {
      return 'true';
    }
  });
}

async function inviteUserAward(params) {
  let completed = await knex('user_invite')
    .count('invited_by')
    .select('invited_by')
    .where({ 'invited_by': params.invitedBy })
    .groupBy('invited_by')
    .having(knex.raw('count(invited_by) > 2'));

  console.log('------------------------');
  console.log(params);
  console.log(completed);


  // await AchievementAward.query().insert({
  //   'name': 'invited 1 users',
  //   'achievementId': 'achievements12',
  //   'userId': completed[0].invited_by
  // });
  if (params.metadata.oneInviteComplete == 'false' && completed > 0) {
    await User.query().patchAndFetchById(params.id, { 'metadata:oneInviteComplete': 'true' });
  }
}

/**
 * @api {post} /users POST create a new user.
 * @apiName PostAUser
 * @apiGroup Authentication
 *
 * @apiParam (Required Params) {string} user[username] username
 * @apiParam (Required Params) {string} user[email] Unique email
 * @apiParam (Required Params) {string} user[password] validated password
 * @apiParam (Optional Params) {string} user[invitedBy] auto filled on the form
 *
 * @apiPermission none
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "user": {
 *          "id": "string",
 *          "username": "string",
 *          "inviteCode": "DTrbi6aLj",
 *          "createdAt": "string",
 *          "updatedAt": "string"
 *        }
 *     }
 *
 * @apiError {String} errors Bad Request.
 */

router.post('/', validateAuthRoutes.validateNewUser, createPasswordHash, async ctx => {
  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();
  ctx.request.body.user.email = ctx.request.body.user.email.toLowerCase();
  ctx.request.body.user.lastSeen = await updatedAt();
  ctx.request.body.user.metadata = { 'profileComplete': 'false', 'oneInviteComplete': 'false' };

  const inviteInsert = await knex('user_invite').insert([{ 'invited_by': ctx.request.body.user.inviteCode }], ['id', 'invited_by']);
  // if (ctx.request.body.user.inviteCode != null) {
  //   await inviteUserAward(ctx.request.body.user);
  // }

  let newUser = ctx.request.body.user;
  newUser.inviteCode = shortid.generate();
  newUser.lastSeen = await updatedAt();

  const firstUserCheck = await User.query();
  let role = !firstUserCheck.length ? 'groupSuperAdmin' : 'groupBasic';

  try {
    const user = await User.query().insertAndFetch(newUser);
    await knex('group_members').insert({ 'user_id': user.id, 'group_id': role });
    await knex('user_invite').where({ id: inviteInsert[0].id }).update({ user_id: user.id }, ['id', 'invited_by', 'user_id']);

    log.info('Created a user with id %s with username %s with the invite code %s', user.id, user.username, user.inviteCode);

    ctx.status = 201;
    ctx.body = { user };
  } catch (e) {
    ctx.log.info('Failed for user - %s, with error %s', ctx.request.body.user.email, e.message, e.detail);
    ctx.throw(400, null, { errors: [e] });
  }


});


/**
 * @api {get} /users/:id GET a single user using id.
 * @apiName GetAUser
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription list a single user on the platform
 * @apiPermission [admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "user": {
 *       "id": "user2",
 *       "username": "user2",
 *       "createdAt": "2017-12-20T16:17:10.000Z",
 *       "updatedAt": "2017-12-20T16:17:10.000Z",
 *       "profileUri": "uploads/profiles/user1.jpg",
 *       "private": boolean,
 *       "inviteCode": "DTrbi6aLj",
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
 *           "name": "basic"
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

  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let userId = ctx.params.id != 'current' ? ctx.params.id : stateUserId;
  const user = await User.query().findById(userId).mergeJoinEager('[achievementAwards(selectBadgeNameAndId), userRoles(selectName), enrolledCourses(selectNameAndId)]');
  user.profileUri = await getProfileImage(user.profileUri);


  if (!user) {
    ctx.throw(404, 'No User With that Id');
  }

  if (user.id != stateUserId || stateUserId === 'anonymous') {
    // return specific data for all profiles incase it's private
    let publicData = {
      'username': 'private',
      'profileUri': 'images/profile-placeholder.gif',
      'id': user.id,
      'private': user.private
    };
    // return data if profile is not private
    if (user.private === 'false') {
      publicData.username = user.username;
      publicData.profileUri = user.profileUri;
    }
    ctx.status = 200;
    ctx.body = { user: publicData };
  } else {
    enrolledCoursesType(user);
    userRoles(user);
    // get all verification data
    achievementAwardsType(user);
    const userVerification = await knex('user_verification').where({ 'user_id': userId });
    user.userVerification = userVerification;

    if (profileCompleteBoolean(user) && user.metadata.profileComplete === 'false') {
      await User.query().patchAndFetchById(ctx.params.id, { 'metadata:profileComplete': 'true' });
      await AchievementAward.query().insert({
        'name': 'profile completed',
        'achievementId': ctx.params.id,
        'userId': ctx.params.id
      });
    }

    log.info('Got a request from %s for %s', ctx.request.ip, ctx.path);

    ctx.status = 200;
    ctx.body = { user };
  }
});
/**
 * @api {get} /users GET all users.
 * @apiName GetUsers
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription list all user on the platform
 * @apiPermission [admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 */
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'profile'), async ctx => {
  let user = User.query();

  if (ctx.query.username) {
    user.where('username', ctx.query.username);
    ctx.assert(user, 404, 'No User With that username');
  }
  try {
    user = await user.mergeJoinEager('[achievementAwards(selectBadgeNameAndId), userRoles(selectName), enrolledCourses(selectNameAndId)]');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(406, null, { errors: [e.message] }); }
    throw e;
  }

  enrolledCoursesType(user);
  achievementAwardsType(user);
  userRoles(user);

  ctx.body = { user };
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
 */

router.put('/:id', jwt.authenticate, permController.requireAuth, async ctx => {

  ctx.request.body.user.updatedAt = await updatedAt();

  let user;
  try {
    user = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);
    ctx.assert(user, 404, 'That user does not exist.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
    throw e;
  }

  if (profileCompleteBoolean(user) && user.metadata.profileComplete === 'false') {
    await User.query().patchAndFetchById(ctx.params.id, { 'metadata:profileComplete': 'true' });
    await AchievementAward.query().insert({
      'name': 'profile completed',
      'achievementId': ctx.params.id,
      'userId': ctx.params.id
    });
  }

  ctx.status = 200;
  ctx.body = { user };

});

router.post('/invite/:id', async ctx => {
  let invite;
  try {
    // invite = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);
    invite = await knex('user_invite').insert([{ user_id: ctx.params.id, 'invited_by': ctx.request.body.user.inviteBy }], ['id', 'invited_by', 'user_id']);
    ctx.assert(invite, 404, 'That user does not exist.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
  }

  inviteUserAward(ctx.request.body.user);


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

router.post('/:id/profile-image', permController.requireAuth, async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  const { files } = await busboy(ctx.req);
  const fileNameBase = shortid.generate();
  const uploadPath = 'uploads/images/profile';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  const resizer = sharp().resize(500, 500).jpeg({ quality: 70 });

  files[0].pipe(resizer);

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
      await User.query().patchAndFetchById(ctx.params.id, { profileUri: fileNameBase });

      ctx.body = {
        host: `${params.Bucket}.s3.amazonaws.com/uploads/profiles`,
        path: `${fileNameBase}.jpg`
      };
    } catch (e) {
      log.error(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }
  }

  else {
    await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);
    await User.query().findById(ctx.params.id).patchAndFetchById({ profile_uri: `${uploadPath}/${fileNameBase}.jpg` });
    ctx.body = {
      host: ctx.host,
      path: `${uploadPath}/${fileNameBase}.jpg`
    };
  }
});

module.exports = router.routes();