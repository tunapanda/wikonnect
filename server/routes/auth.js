const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');
const sendMAil = require('../utils/sendMail');

const router = new Router({
  prefix: '/auth'
});

router.post('/', validateAuthRoutes.validateUserLogin, async ctx => {
  let user = await User.query().where('username', ctx.request.body.username);
  ctx.assert(user.length, 401, 'no user', { errors: { username: ['Username does not exist.'] } });
  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];

  user = user[0];
  // add to user group on creation
  // user id and groupName
  // adding role into  data signing object
  let role = 'basic';
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
    ctx.status = 401;
    ctx.body = {
      error: 'bad password'
    };
  }
});

router.get('/reset/:mail', async ctx => {
  let confirmEmail = await User.query().where('email', ctx.params.mail);
  confirmEmail = confirmEmail[0];

  if (!confirmEmail) {
    ctx.throw(401, 'no user found with that email');
  }

  const token = jsonwebtoken.sign({
    data: confirmEmail,
    exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
  }, secret);

  try {
    let status = sendMAil(ctx.params.mail, token);
    console.log(status);
  } catch (error) {
    console.log(error.message);
  }

  ctx.status = 201;
  ctx.body = { confirmEmail };
});

router.get('/validate/:resetToken', async ctx => {
  console.log(ctx.params.resetToken);
});

module.exports = router.routes();
