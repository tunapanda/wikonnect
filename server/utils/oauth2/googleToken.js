const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Oauth2 = require('../../models/user');
/**
 *
 * @param {*} tableName
 * @param {*} data
 *
 * * TableName: oauth2
 *      provider => String => oauth2 provider
 *      user_id => Foreign Key => users.id
 *      email => String => oauth provider registered email
 *
 * TableName: oauth2
 *      provider => String => oauth2 provider
 *      user_id => Foreign Key => users.id
 *      email => String => oauth provider registered email
 */


module.exports = async function googleToken(code) {
  const response = await fetch(`https://people.googleapis.com/v1/people/me?personFields=names,coverPhotos,emailAddresses,phoneNumbers&access_token=${code}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  });

  const hash = await bcrypt.hash(code, 10);

  const resp = response.data;
  let oauth2Data = {
    'email': resp.emailAddresses[0].value.toLowerCase(),
    'provider': 'google'
  };
  let userData = {
    'username': resp.names[0].displayName.toLowerCase(),
    'profileUri': resp.names[0].coverPhotos,
    'email': oauth2Data.email,
    'hash': hash,
    'metadata': { 'profileComplete': 'false', 'oneInviteComplete': 'false' }
  };

  const checkUser = await User.query().where({ email: oauth2Data.email });
  const checkOauth = await Oauth2.query().where({ email: oauth2Data.email });

  let token;
  if (checkUser.length && checkOauth.length) {
    oauth2Data['userId'] = checkUser[0].id;
    await Oauth2.query().insert(oauth2Data);
    token = checkUser;
  } else {
    const newUser = await User.query().insertAndFetch(userData);
    oauth2Data['userId'] = newUser.id;
    await Oauth2.query().insert(oauth2Data);
    token = newUser;
  }

  delete token[0].hash;

  return token[0];
};
