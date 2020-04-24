const Router = require('koa-router');
const bcrypt = require('bcrypt');
const path = require('path');

const busboy = require('async-busboy');
const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');

const User = require('../models/user');
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


async function returnType(parent) {
  try {
    if (parent.length == undefined) {
      parent.achievementAwards.forEach(lesson => {
        return lesson.type = 'achievementAwards';
      });
    } else {
      parent.forEach(mod => {
        mod.achievementAwards.forEach(lesson => {
          return lesson.type = 'achievementAwards';
        });
      });
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
  console.log(ctx.req.body);
  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();
  ctx.request.body.user.email = ctx.request.body.user.email.toLowerCase();

  const invitedBy = ctx.request.body.user.invitedBy;
  delete ctx.request.body.user.invitedBy;

  let newUser = ctx.request.body.user;
  // generate personal invite code for use when inviting others
  newUser.inviteCode = shortid.generate();

  const firstUserCheck = await User.query();
  let role = !firstUserCheck.length ? 'groupSuperAdmin' : 'groupBasic';


  try {
    const user = await User.query().insertAndFetch(newUser);
    await knex('group_members').insert({ 'user_id': user.id, 'group_id': role });
    await knex('user_invite').insert({ 'user_id' : user.id, 'invited_by': invitedBy });

    log.info('Created a user with id %s with username %s with the invite code %s', user.id, user.username, user.invite_code);

    ctx.status = 201;
    ctx.body = { user };
  } catch (e) {
    ctx.log.info('Failed for user - %s, with error %s', ctx.request.body.user.email, e.message);
    if (e.constraint === 'users_email_unique') {
      ctx.throw(422, 'email is not unique', { message: 'email' });
    }
    if (e.constraint === 'users_username_unique'){
      ctx.throw(422, 'username is not unique', { message: 'username' });
    }
    ctx.throw(400, null, { errors: ['Bad Request'] });
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

  const user = await User.query().findById(ctx.params.id).mergeJoinEager('[achievementAwards(selectBadgeNameAndId), userRoles(selectName), enrolledCourses(selectNameAndId)]');
  returnType(user);
  enrolledCoursesType(user);


  if (!user) {
    ctx.throw(404, 'No User With that Id');
  }

  if (user.id !== ctx.state.user.data.id) {
    log.info('Error logging  %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(401, 'You do not have permissions to view that user');
  }

  // get all verification data
  const userVerification = await knex('user_verification').where({ 'user_id': ctx.params.id });
  user.userVerification = userVerification;

  log.info('Got a request from %s for %s', ctx.request.ip, ctx.path);
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
  returnType(user);

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

router.put('/:id', jwt.authenticate, permController.requireAuth, permController.grantAccess('updateOwn', 'profile'), async ctx => {

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

  ctx.status = 200;
  ctx.body = { user };

});

router.post('/invite/:id', async ctx => {
  let invite;
  try {
    invite = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);
    ctx.assert(invite, 404, 'That user does not exist.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
  }

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

router.post('/:id/profile-image', async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  const { files } = await busboy(ctx.req);
  const fileNameBase = shortid.generate();
  const uploadPath = 'uploads/images/profile';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  // const sizes = [
  //   70,
  //   320,
  //   640
  // ];

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  // const resizedFiles = Promise.all(sizes.map((size) => {
  //   const resize = sharp()
  //     .resize(size, size)
  //     .jpeg({ quality: 70 })
  //     .toFile(`public/uploads/images/profile/${fileNameBase}_${size}.jpg`);
  //   files[0].pipe(resize);
  //   return resize;
  // }));

  const resizer = sharp()
    .resize(500, 500)
    .jpeg({ quality: 70 });

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

      console.log('Uploaded in:', uploaded.Location);
      ctx.body = {
        host: `${params.Bucket}.s3.amazonaws.com/uploads/profiles`,
        path: `${fileNameBase}.jpg`
      };
    }

    catch (e) {
      console.log(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }

  }

  else {


    await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);

    ctx.body = {
      host: ctx.host,
      path: `${uploadPath}/${fileNameBase}.jpg`
    };
  }
});

module.exports = router.routes();