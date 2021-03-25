const bcrypt = require('bcrypt');
const Router = require('koa-router');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const sendMail = require('../utils/sendMail');
const log = require('../utils/logger');
const { secret } = require('../middleware/jwt');
const validateAuthRoutes = require('../middleware/validateRoutePostSchema/validateAuthRoutes');
const crypto = require('crypto');

const router = new Router({
  prefix: '/auth'
});

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

  const userData = await user.$query().findById(user.id).withGraphFetched('userRoles(selectName)');

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


router.post('/verify', async ctx => {
  const email = ctx.request.body.user.email;
  const user = await User.query().findOne({ 'email': email, 'emailVerified': false });

  try {
    const token = crypto.randomBytes(64).toString('hex');
    const buf = Buffer.from(email, 'ascii').toString('base64');

    const userData = await user.$query().patchAndFetch({
      'resetPasswordExpires': new Date(+new Date() + 1.8e6),
      'resetPasswordToken': token,
    });
    // sending email
    sendMail(buf, token);
    log.info('Email verification sent to %s', email);
    ctx.status = 201;
    ctx.body = userData;

  } catch (e) {
    log.info('Email verification already requested');
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});

router.get('/verify', async ctx => {
  const decodedMail = Buffer.from(ctx.query.email, 'base64').toString('ascii');
  const user = await User.query().findOne({ 'email': decodedMail, 'resetPasswordToken': ctx.query.token });
  ctx.assert(user, 'No email found');
  let message;
  try {
    if (new Date() < user.resetPasswordExpires) {
      message = await user.$query().patchAndFetch({
        'emailVerified': true,
        'resetPasswordExpires': new Date()
      });
    }

  } catch (e) {
    log.info('Email verification already requested');
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = message;
});


module.exports = router.routes();
