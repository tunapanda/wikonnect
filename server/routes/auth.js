const bcrypt = require('bcrypt');
const Router = require('koa-router');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const sendMAil = require('../utils/sendMail');
const { secret } = require('../middleware/jwt');
const { lastSeen } = require('../utils/timestamp');
const redisClient = require('../utils/redisConfig');
const UserVerification = require('../models/user_verification');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');


const router = new Router({
  prefix: '/auth'
});

/**
 * @api {post} /auth POST login a user.
 * @apiName PostLoginAUser
 * @apiGroup Authentication
 *
 * @apiParam (Required Params) {string} username username
 * @apiParam (Required Params) {string} password validated password
 *
 * @apiPermission none
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "username": "string",
 *       "password": "string",
 *     }
 *
 * @apiError {String} errors Bad Request.
 */
router.post('/', validateAuthRoutes.validateUserLogin, async ctx => {
  const username = ctx.request.body.username.toLowerCase();

  let user = await User.query().where('username', username);
  if (!user.length) {
    ctx.throw(404, null, {
      errors: [{
        'name': 'Wrong username or password',
        'constraint': 'errors',
      }]
    });
  }


  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];
  user = user[0];

  const userData = await User.query().findById(user.id).eager('userRoles(selectName)');

  let role = userData['userRoles'][0] !== undefined ? userData['userRoles'][0].name : 'basic';
  userInfoWithoutPassword['role'] = role;

  if (await bcrypt.compare(ctx.request.body.password, hashPassword)) {
    // eslint-disable-next-line require-atomic-updates
    await lastSeen(user.id);
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, secret)
    };
  } else {
    ctx.log.error('Wrong email or password from %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(404, null, {
      errors: [{
        'name': 'Wrong username or password',
        'constraint': 'errors',
      }]
    });
  }
});


async function verifyEmail(email) {
  const rand = Math.floor((Math.random() * 100) + 54);
  const resetMail = email;

  const reply = redisClient.exists(resetMail);
  if (reply !== true) {
    return true;
  }

  redisClient.set(resetMail, rand);
  redisClient.expire(resetMail, 600);

  const buf = Buffer.from(resetMail, 'ascii').toString('base64');
  sendMAil(buf, rand);
}
router.get('/reset/:mail', async ctx => {
  let confirmEmail = await User.query().where('email', ctx.params.mail);
  confirmEmail = confirmEmail[0];

  if (confirmEmail == undefined) {
    console.log('criminal', { error: { errors: ['User email not found'] } });
    throw new Error({ error: { errors: ['User email not found'] } });
  }

  try {
    await verifyEmail(confirmEmail.email);


    ctx.log.info('Email verification sent to %s', confirmEmail.email);
    ctx.status = 201;
    ctx.body = { confirmEmail };

  } catch (e) {
    ctx.log.info('Email verification already requested');
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }


});

router.get('/validate', async ctx => {
  const decodedMail = Buffer.from(ctx.query.mail, 'base64').toString('ascii');

  const getEmail = redisClient.get(decodedMail);
  if (getEmail === false) {
    ctx.throw(401, 'Invalid email address');
  }
  const delEmail = redisClient.del(decodedMail, ctx.query.id);
  if (delEmail !== true) {
    ctx.throw(401, 'Token error');
  }

  // after validation update user verification table with current data
  const confirmEmail = await User.query().where('email', decodedMail);
  if (!confirmEmail[0]) {
    ctx.throw(401, 'No user with that email');
  }
  let userId = confirmEmail[0].id;
  const data = {
    userId: userId,
    email: true,
    phoneNumber: true
  };

  // check if validation record already exists
  // if it does then update the record and avid making a new one
  let verifiedData = await UserVerification.query().where('user_id', userId);
  let veedData;
  if (!verifiedData[0]) {
    veedData = await UserVerification.query().insertAndFetch(data);
  } else {
    veedData = await UserVerification.query().patchAndFetchById(verifiedData[0].id, data);
  }

  ctx.status = 200;
  ctx.body = { message: 'Email has been verified', veedData };

});


module.exports = router.routes();
