const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const tools = require('./tools');

module.exports = async (code) => {
  // Exchange code for an access token:
  // POST https://github.com/login/oauth/access_token
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      'client_id': process.env.GITHUB_CLIENT_ID,
      'client_secret': process.env.GITHUB_ACCESS_TOKEN,
      'code': code,
      'redirect_uri': 'http://localhost:4200/torii/redirect.html',
    }),
  });
  const data = await response.json();

  // Authorization: token OAUTH - TOKEN
  // GET https://api.github.com/user
  const user = await fetch('https://api.github.com/user', {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `token ${data.access_token}` }
  });


  // Authorization: token OAUTH - TOKEN
  // GET https://api.github.com/user/emails
  const userEmail = await fetch('https://api.github.com/user/emails', {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `token ${data.access_token}` }
  });


  const username = await tools.nanoid();
  const hashPassword = await bcrypt.hash(code, 10);
  const userData = await user.json();
  const { login, avatar_url, name, bio } = userData;
  const userDataEmail = await userEmail.json();

  return {
    email: userDataEmail[0].email,
    hash: hashPassword,
    username: login.toLowerCase(),
    profileUri: avatar_url,
    firstName: name.split(' ')[0] || username.toLowerCase(),
    lastName: name.split(' ')[1] || username.toLowerCase(),
    metadata: {
      'profileComplete': 'false',
      'oneInviteComplete': 'false',
      'firstName': name.split(' ')[0] || username.toLowerCase(),
      'lastName': name.split(' ')[1] || username.toLowerCase(),
      'about': bio
    }
  };
};