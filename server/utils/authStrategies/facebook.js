const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const tools = require('./tools');

module.exports = async (code) => {
  const username = await tools.nanoid();
  const hashPassword = await bcrypt.hash(code, 10);

  const response = await fetch(`https://graph.facebook.com/v10.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.FACEBOOK_REDIRECT}&state=email`);
  const data = await response.json();
  const fData = await fetch(`https://graph.facebook.com/v10.0/me/?access_token=${data.access_token}&fields=id,name,email,birthday`);
  const userData = await fData.json();

  return {
    email: userData.email,
    hash: hashPassword,
    username: username.toLowerCase(),
    firstName: userData.name.split(' ')[0] || username.toLowerCase(),
    lastName: userData.name.split(' ')[1] || username.toLowerCase(),
    metadata: {
      'profileComplete': 'false',
      'oneInviteComplete': 'false',
      'firstName': userData.name.split(' ')[0] || username.toLowerCase(),
      'lastName': userData.name.split(' ')[1] || username.toLowerCase(),
    }
  };
};