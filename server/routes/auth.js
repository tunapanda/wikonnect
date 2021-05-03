const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Router = require('koa-router');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const log = require('../utils/logger');
const checkIfPasswordAreSame = require('../utils/routesUtils/authRouteUtils');
const sendMailMessage = require('../utils/sendMailMessage');
// const { requireAuth } = require('../middleware/permController');
const { secret } = require('../middleware/jwt');
const validateAuthRoutes = require('../middleware/validateRoutePostSchema/validateAuthRoutes');

const router = new Router({
  prefix: '/auth'
});


const DOMAIN_NAME = process.env.DOMAIN_NAME || 'http://localhost:4200';

/**
 * @api {post} /api/v1/auth POST login a user.
 * @apiName PostLoginAUser
 * @apiGroup Authentication
 *
 * @apiParam {string} username username
 * @apiParam {string} password validated password
 *
 * @apiPermission none
 * @apiSampleRequest https://localhost:3000/api/v1/auth
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

  let user = await User.query().where('username', username).withGraphFetched('oauth2(selectOauth2)');
  if (!user.length) ctx.throw(404, null, { errors: [{ 'name': 'Wrong username or password', 'constraint': 'errors', }] });


  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];
  user = user[0];

  const userData = await user.$query().findById(user.id).withGraphFetched('userRoles(selectNameAndId)');

  let role = userData['userRoles'][0] !== undefined ? userData['userRoles'][0].name : 'basic';
  userInfoWithoutPassword['role'] = role;

  if (user.oauth2[0] != undefined && user.oauth2[0].userId == user.id) {
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, secret)
    };
  } else if (await bcrypt.compare(ctx.request.body.password, hashPassword)) {
    // eslint-disable-next-line require-atomic-updates
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, secret)
    };
  } else {
    log.error('Wrong email or password from %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(404, null, {
      errors: [{
        'name': 'Wrong username or password',
        'constraint': 'errors',
      }]
    });
  }
});

/**
 * @api {post} /api/v1/auth/forgot_password POST forgot user route.
 * @apiName ForgotPasswordRoute
 * @apiGroup Authentication
 *
 * @apiParam {string} auth[email] emailAddress
 *
 * @apiPermission basic
 * @apiSampleRequest https://localhost:3000/api/v1/auth/forgot_password
 *
 * @apiError {String} errors Bad Request.
 */

router.post('/forgot_password', async ctx => {
  const email = ctx.request.body.auth.email;
  const user = await User.query().findOne({ 'email': email });
  ctx.assert(user, 404, user);

  try {
    const token = crypto.randomBytes(64).toString('hex');
    const buf = Buffer.from(email, 'ascii').toString('base64');

    const userData = await user.$query().patchAndFetch({
      'resetPasswordExpires': new Date(+new Date() + 1.8e6),
      'resetPasswordToken': token,
    });
    // sending email
    const link = `${DOMAIN_NAME}/reset_password?email=${buf}&token=${token}`;
    await sendMailMessage(buf, userData.username, link, 'forgot-password-email', 'Password help has arrived!');
    log.info('Email verification sent to %s', email);

    ctx.status = 201;
    // ctx.body = userData;
    ctx.body = { email: email, token: token };

  } catch (e) {
    log.info('Email verification already requested');
    if (e.statusCode) {
      ctx.throw(e.statusCode, e, { errors: [e.message] });
    } else { ctx.throw(400, e, { errors: [e.message] }); }
    throw e;
  }
});


/**
 * @api {post} /api/v1/auth/reset_password POST new password.
 * @apiName ForgotPasswordRoute
 * @apiGroup Authentication
 *
 * @apiParam {string} auth[new_password] newPassword
 * @apiParam {string} auth[verify_password] verifyPassword
 * @apiParam {string} auth[token] token
 * @apiParam {string} auth[email] email
 *
 * @apiPermission basic
 * @apiSampleRequest https://localhost:3000/api/v1/auth/reset_password
 *
 * @apiError {String} errors Bad Request.
 */



router.post('/reset_password', checkIfPasswordAreSame, async ctx => {
  const auth = ctx.request.body.auth;
  const decodedMail = Buffer.from(auth.email, 'base64').toString('ascii');

  const user = await User.query().findOne(
    'resetPasswordExpires', '>', new Date(+new Date() + 0),
    {
      reset_password_token: auth.token,
      email: decodedMail,
    }
  );
  ctx.assert(user, 404, user);

  try {
    const userData = await user.$query().patchAndFetch({ 'resetPasswordExpires': new Date(), 'hash': auth.hash });
    // generate link and send email
    await sendMailMessage(userData.username, 'reset-password-email', 'Password Reset Successfully');
    log.info('Password changed for user with email: %s', decodedMail);

    ctx.status = 201;
    ctx.body = userData;

  } catch (e) {
    log.info('Passwords do not match');
    if (e.statusCode) {
      ctx.throw(e.statusCode, e, { errors: [e.message] });
    } else { ctx.throw(400, e, { errors: [e.message] }); }
    throw e;
  }
});

module.exports = router.routes();
