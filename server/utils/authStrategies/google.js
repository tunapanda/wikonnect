const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const tools = require('./tools');


module.exports = async(code) => {
  const hashPassword = await bcrypt.hash(code, 10);
  const username = await tools.nanoid();

  // const response = await fetch(`https://people.googleapis.com/v1/people/me?access_token=${code}&personFields=names,emailAddresses`);
  const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',{
    headers: { 'Authorization': `Bearer ${code}`, 'Content-Type': 'application/json'}
  });
  const data = await response.text();
  const gData = JSON.parse(data);

  return {
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
};