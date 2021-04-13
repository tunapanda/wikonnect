const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid/async');
const fetch = require('node-fetch');
const Router = require('koa-router');

const User = require('../models/user');
const Oauth2 = require('../models/oauth2');

// custom username using alphabet lowercase letters only
// ~17 thousand years needed, in order to have a 1 % probability of at least one collision.
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 17);


const router = new Router({
  prefix: '/oauth2s'
});

router.post('/', async ctx => {
  const provider = ctx.request.body.oauth2.provider;
  const googleToken = ctx.request.body.oauth2.googleToken;
  const hashPassword = await bcrypt.hash(googleToken, 10);
  const username = await nanoid();

  let newUser;
  if (provider === 'google') {
    const response = await fetch(`https://people.googleapis.com/v1/people/me?access_token=${googleToken}&personFields=names,emailAddresses`);
    const data = await response.text();
    const gData = JSON.parse(data);

    newUser = {
      email: gData.emailAddresses[0].value,
      hash: hashPassword,
      username: username,
      firstName: gData.names[0].familyName,
      lastName: gData.names[0].givenName,
      metadata: {
        'profileComplete': 'false',
        'oneInviteComplete': 'false',
        'firstName': gData.names[0].familyName,
        'lastName': gData.names[0].givenName
      }
    };
  } else {
    const response = await fetch(`https://graph.facebook.com/v10.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${googleToken}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&state=email`);
    const data = await response.json();
    const fData = await fetch(`https://graph.facebook.com/v10.0/me/?access_token=${data.access_token}&fields=id,name,email,birthday`);
    const userData = await fData.json();
    newUser = {
      email: userData.email,
      hash: hashPassword,
      username: username,
      firstName: userData.name.split(' ')[0] || username.toLowerCase(),
      lastName: userData.name.split(' ')[1] || username.toLowerCase(),
      metadata: {
        'profileComplete': 'false',
        'oneInviteComplete': 'false',
        'firstName': userData.name.split(' ')[0] || username.toLowerCase(),
        'lastName': userData.name.split(' ')[1] || username.toLowerCase(),
      }
    };

  }

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
    } else { ctx.throw(400, null, { errors: [err.message] }); }
  }
});

module.exports = router.routes();
