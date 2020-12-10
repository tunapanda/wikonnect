const fetch = require('node-fetch');
const environment = process.env.NODE_ENV || 'development';

/**
 TODO: Add fetch package for webhook request to the moja platform
 * POST request accepting -> (campaign_id, points, enduser_id, partner_id, userId)
 *
 * */

// const data = {
//   'enduser_id': '3ffcaa53-c5e6-4273-868c-f8d398e6602d',
//   'partner_id': 'adfc0e69-4fe0-4708-85e6-0ba40f901261',
//   'campaign_id': '2b40b903-fbe1-4f4d-b2dd-f707fb7d6edb',
//   'points': 5
// };


let moja;
try {
  moja = require('../../config/moja')[environment];
} catch (e) {
  moja = require('../../config/moja.example')[environment];
}


/**
 * Post data gotten from the query params
 * @param {*} url
 * @param {*} data
 */
module.exports = async function mojaEndpoint(data) {
  // Default options are marked with *
  const response = await fetch(moja.url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Authorization': 'Bearer ' + moja.access_token,
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  console.log();
  console.log(data);
  console.log(await response);
  return await response.json(); // parses JSON response into native JavaScript objects
};
