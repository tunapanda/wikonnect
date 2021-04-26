const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid/async');
const fetch = require('node-fetch');
const Router = require('koa-router');

const User = require('../models/user');
const Oauth2 = require('../models/oauth2');

const router = new Router({
  prefix: '/oauth2s'
});

router.post('/', async ctx => {
  const googleToken = ctx.request.body.oauth2.googleToken;
  const provider = ctx.request.body.oauth2.provider;
  const response = await fetch(`https://people.googleapis.com/v1/people/me?access_token=${googleToken}&personFields=names,emailAddresses`);
  const data = await response.text();
  const gData = JSON.parse(data);

  const hashPassword = await bcrypt.hash(googleToken, 10);
  const username = await nanoid(11);
  // const username = gData.names[0].displayName.split(' ').join('').replace(/^[\s\uFEFF\xAO] + |[\s\uFEFF\xAO] + $ /g, ' ');
  let newUser = {
    email: gData.emailAddresses[0].value,
    hash: hashPassword,
    username: username.toLowerCase(),
    firstName: gData.names[0].familyName,
    lastName: gData.names[0].givenName,
    metadata: {
      'profileComplete': 'false',
      'oneInviteComplete': 'false',
      'firstName': gData.names[0].familyName,
      'lastName': gData.names[0].givenName
    }
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
