const Router = require('koa-router');
const User = require('../models/user');
const UserVerification = require('../models/user_verification');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');
const sendMAil = require('../utils/sendMail');
const redis = require('redis');
const redisClient = redis.createClient(); // default setting.


const router = new Router({
  prefix: '/auth'
});

router.post('/', validateAuthRoutes.validateUserLogin, async ctx => {
  let user = await User.query().where('username', ctx.request.body.username);
  if (!user.length) ctx.throw(404, null, 'wrong_email_or_password');

  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];
  user = user[0];

  const userData = await User.query().findById(user.id).eager('userRoles(selectName)');
  let role = userData.userRoles[0].name !== null ? userData.userRoles[0].name : 'basic';
  userInfoWithoutPassword['role'] = role;

  if (await bcrypt.compare(ctx.request.body.password, hashPassword)) {
    // eslint-disable-next-line require-atomic-updates
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, secret)
    };
  } else {
    ctx.throw(406, null, 'email_or_password_is_wrong');
  }
});

router.get('/reset/:mail', async ctx => {
  let confirmEmail = await User.query().where('email', ctx.params.mail);
  confirmEmail = confirmEmail[0];

  if (!confirmEmail) {
    ctx.throw(401, 'no user found with that email');
  }

  const rand = Math.floor((Math.random() * 100) + 54);
  const resetMail = confirmEmail.email;

  const reply = redisClient.exists(resetMail);
  if (reply !== true) {
    ctx.throw(401, 'Email verification already requested');
  }

  redisClient.set(resetMail, rand);
  redisClient.expire(resetMail, 600);

  try {
    const buf = Buffer.from(resetMail, 'ascii').toString('base64');
    sendMAil(buf, rand);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  ctx.status = 201;
  ctx.body = { confirmEmail };
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
  let confirmEmail = await User.query().where('email', decodedMail);
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
