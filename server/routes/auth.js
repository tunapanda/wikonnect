const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('../middleware/jwt');

const router = new Router({
  prefix: '/auth'
});

router.post('/', validateAuthRoutes.validateUserLogin, async ctx => {
  let user = await User.query().where('username', ctx.request.body.username);

  ctx.assert(user.length, 401, 'no user', { errors: { username: ['Username does not exist.'] } });

  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];

  user = user[0];

  if (await bcrypt.compare(ctx.request.body.password, hashPassword)) {
    // eslint-disable-next-line require-atomic-updates
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        //exp in seconds
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, jwt.secret)
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      error: 'bad password'
    };
    return;
  }
  return ctx;
});

module.exports = router.routes();
