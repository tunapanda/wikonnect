const User = require('../models/user');

/**
 * get user by username provided in ctx
 * @param {*} ctx 
 * @param {*} next 
 */

//Checks to ensure that username is unique
async function getUserByUsername(ctx, next) {
  const user = await User.query().findOne({ username: ctx.request.body.user.username.toLowerCase() });
  if (!user) {
    await next();
  } else {
    ctx.status = 406;
    ctx.body = {
      error: 'User exists',
    };
    return ctx;
  }
}

module.exports = getUserByUsername;