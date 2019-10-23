const jwt = require('koa-jwt');
const User = require('../models/user');


async function authenticate(ctx) {
  if (ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, jwt.secret),
      message: "Successfully logged in!"
    };
  } else {
    ctx.status = ctx.status = 401;
    ctx.body = {
      message: "Authentication failed"
    };
  }
  return ctx;
}


async function getUserByUsername(ctx, next) {
  const user = User.query().where("username", ctx.request.body.user.username.toLowerCase());
  if (!user.username) {
    next();
  } else {
    ctx.status = 406;
    ctx.body = {
      error: "User exists"
    }
    return ctx;
  }
}

module.exports = {
  authenticate,
  getUserByUsername
}