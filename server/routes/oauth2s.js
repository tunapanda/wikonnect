
const Router = require('koa-router');
const User = require('../models/user');
const Oauth2 = require('../models/oauth2');
const authStrategies = require('../utils/authStrategies/index');
const log = require('../utils/logger');

const router = new Router({
  prefix: '/oauth2s'
});

router.post('/', async ctx => {
  const { code, provider } = ctx.request.body.oauth2;
  const newUser = await authStrategies[provider](code);
  try {
    const user = await User.query().insertAndFetch(newUser);
    await Oauth2.query().insertAndFetch({ provider: provider, email: newUser.email, user_id: user.id });
    ctx.status = 200;
    ctx.body = { oauth2: user };
  } catch (err) {
    if (err.constraint == 'users_email_unique') {
      let user = await User.query().where('email', newUser.email);
      delete user[0].hash;
      user = user[0];
      ctx.status = 200;
      ctx.body = { oauth2: user };
    } else {
      log.error(err);
      ctx.throw(err.status.code, null, { errors: [err.message] });
    }
  }
});

module.exports = router.routes();
