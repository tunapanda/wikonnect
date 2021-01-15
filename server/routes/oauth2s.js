const bcrypt = require('bcrypt');
const shortid = require('shortid');
const fetch = require('node-fetch');
const Router = require('koa-router');

const User = require('../models/user');
const Oauth2 = require('../models/oauth2');

const { updatedAt } = require('../utils/timestamp');

const router = new Router({
  prefix: '/oauth2s'
});

router.post('/', async ctx => {
  const googleToken = ctx.request.body.oauth2.googleToken;
  const provider = ctx.request.body.oauth2.provider;
  const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken);
  const data = await response.text();
  const gData = JSON.parse(data);

  const hashPassword = await bcrypt.hash(googleToken, 10);
  const username = shortid.generate().toLowerCase();

  let newUser = {
    email: gData.email,
    hash: hashPassword,
    username: username,
    lastSeen: await updatedAt(),
    metadata: { 'profileComplete': 'false', 'oneInviteComplete': 'false' }
  };

  try {
    const user = await User.query().insertAndFetch(newUser);
    await Oauth2.query().insertAndFetch({ provider: provider, email: newUser.email, user_id: user.id });
    ctx.body = { oauth2: user };
  } catch (err) {
    if (err.constraint == 'users_email_unique') {
      let user = await User.query().where('email', newUser.email);
      delete user[0].hash;
      user = user[0];
      ctx.body = { oauth2: user };
    } else { ctx.throw(400, null, { errors: [err.message] }); }
  }
});

module.exports = router.routes();
