const jwt = require('koa-jwt');

const secret = 'secret';

module.exports = {
  secret,
  authenticate: jwt({ secret: secret, passthrough: true})
};