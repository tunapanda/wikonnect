const jwt = require('koa-jwt');

const secret = process.env.SECRET;
/**
 * validates and enforces token from all routes aside from users and auth
 */
module.exports = {
  secret,
  authenticate: jwt({ secret: secret, passthrough: true }).unless({ path: [/^\/api\/v1\/users/, '/'] })
};