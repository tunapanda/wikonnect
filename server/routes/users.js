const Router = require('koa-router');
const path = require('path');

const { nanoid } = require('nanoid/async');
const sharp = require('sharp');
const koaBody = require('koa-body')({ multipart: true, multiples: false, keepExtensions: true });


const User = require('../models/user');
const Oauth2 = require('../models/oauth2');

const jwt = require('../middleware/jwt');
const permController = require('../middleware/permController');
const validateAuthRoutes = require('../middleware/validateRoutePostSchema/validateAuthRoutes');

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
  let role = !userCheck.length ? 'groupSuperAdmin' : 'groupBasic';

  try {
    const user = await User.query().insertAndFetch(newUser);
    await knex('group_members').insert({ 'user_id': user.id, 'group_id': role });
    await knex('user_invite').insert([{ 'invited_by': invitedBy, user_id: user.id }], ['id', 'invited_by', 'user_id']);
    inviteUserAward(invitedBy);

    log.info('Created a user with id %s with username %s with the invite code %s', user.id, user.username, user.inviteCode);

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

  let user = await User.query()
    .findById(userId)
    .withGraphFetched('[achievementAwards(selectBadgeNameAndId), userRoles(selectNameAndId),' +
      ' enrolledCourses(selectNameAndId)]');

  ctx.assert(user, 404, 'No User With that Id');
  user.profileUri = await getProfileImage(user);
  profileCompleteBoolean(user, ctx.params.id);
  log.info('Got a request from %s for %s', ctx.request.ip, ctx.path);

  ctx.status = 200;
  ctx.body = { user: user };
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
 * @apiParam (Required Params) {string} user[username] username
 * @apiParam (Required Params) {string} user[email] Unique email
 * @apiParam (Required Params) {string} user[password] validated password
 * @apiParam (Optional Params) {string} user[invitedBy] auto filled on the form
 * @apiParam (Optional Params) {string} user[tags] a list of String with tags a user has subscribed to
 * @apiParam (Optional Params) {string} user[metadata] json data
 *
 */
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'profile'),
  async ctx => {

    try {
      const users = await User.query()
        .where(ctx.query)
        .withGraphFetched('[achievementAwards(selectBadgeNameAndId), userRoles(selectName),' +
          ' enrolledCourses(selectNameAndId)]');

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
    try {
      await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);
      await User.query()
        .patchAndFetchById(ctx.params.id, { profileUri: `/${uploadPath}/${fileNameBase}.jpg` });

      ctx.status = 200;
      ctx.body = {
        host: ctx.host,
        path: `/${uploadPath}/${fileNameBase}.jpg`,
      };
    } catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, null, { errors: [e.message] });
      } else {
        ctx.throw(400, null, { errors: [e.message] });
      }
    }
  }
});

module.exports = router.routes();