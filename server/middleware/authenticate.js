const User = require('../models/user');

/**
 * @param  { String } ctx
 * ctx object with username
 * @param  { * } next
 * if username does not exists continue function
 */

async function getUserByUsername(ctx, next) {
  const userName = await User.query().findOne({ username: ctx.request.body.user.username.toLowerCase() });
  const userEmail = await User.query().findOne({ email: ctx.request.body.user.email.toLowerCase() });
  if (!userName && !userEmail) {
    await next();
  } else {
    ctx.throw(406, null, { errors: ['Bad Request'] });
  }
}

module.exports = getUserByUsername;