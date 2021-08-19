const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const tools = require('./tools');

const basicProfileUrl = 'https://api.linkedin.com/v2/me?projection=(' +
  'firstName,' +
  'lastName,' +
  'maidenName,' +
  'profilePicture(displayImage~:playableStreams),' +
  'phoneticFirstName,' +
  'phoneticLastName,' +
  'headline' +
  ')';

const encodeFormData = async (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};


module.exports = async (code) => {

  const params = {
    code: code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_SECRET_KEY,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    grant_type: 'authorization_code'
  };
  /**
   * Step 1: Exchange code for an access token:
   * POST https://github.com/login/oauth/access_token
  */
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken/', {
    method: 'post',
    body: await encodeFormData(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },

  });
  const data = await response.json();

  // Step 2: use access token to get user data

  const userData = await fetch(basicProfileUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${data.access_token}`
    }
  });

  const userDataEmail = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${data.access_token}`
    }
  });

  const { firstName, lastName } = await userData.json();
  const { elements } = await userDataEmail.json();
  const username = await tools.nanoid();
  const hashPassword = await bcrypt.hash(code, 10);

  return {
    email: elements[0]['handle~'].emailAddress,
    hash: hashPassword,
    username: username.toLowerCase(),
    firstName: firstName.localized.en_US,
    lastName: lastName.localized.en_US || username.toLowerCase(),
    metadata: {
      'profileComplete': 'false',
      'oneInviteComplete': 'false',
      'firstName': firstName.localized.en_US || username.toLowerCase(),
      'lastName': lastName.localized.en_US || username.toLowerCase(),
    }
  };
};