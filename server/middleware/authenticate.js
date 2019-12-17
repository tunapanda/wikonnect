const User = require('../models/user');

/**
 * @param  { String } ctx
 * ctx object with username
 * @param  { * } next
 * if username does not exists continue function
 */

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