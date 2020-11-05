const fetch = require('node-fetch');

module.exports = async (code) => {
  const response = await fetch(`https://people.googleapis.com/v1/people/me?personFields=names,coverPhotos,emailAddresses,phoneNumbers&access_token=${code}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  console.log(json);
  return json;
};
