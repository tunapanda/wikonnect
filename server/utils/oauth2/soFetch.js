const fetch = require('node-fetch');
async function getQueryString(params) {
  let esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

async function request(params) {
  let method = params.method || 'GET';
  let qs = '';
  let body;
  let headers = params.headers || {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (['GET', 'DELETE'].indexOf(method) > -1)
    qs = '?' + getQueryString(params.data);
  else // POST or PUT
    body = JSON.stringify(params.data);

  let url = params.url + qs;

  return await fetch(url, { method, headers, body });
}

module.exports  = async (params) => {
  return request(Object.assign({ method: 'GET' }, params));
};
// export default {
//   get: params => request(Object.assign({ method: 'GET' }, params)),
//   post: params => request(Object.assign({ method: 'POST' }, params)),
//   put: params => request(Object.assign({ method: 'PUT' }, params)),
//   delete: params => request(Object.assign({ method: 'DELETE' }, params))
// };