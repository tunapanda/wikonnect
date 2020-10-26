const fetch = require('node-fetch');
const environment = process.env.NODE_ENV || 'development';


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
  const url = moja.url;
  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Authorization': 'Bearer {0}'.format(moja.access_token),
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(res => {
      res.text();
      return res.text();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
