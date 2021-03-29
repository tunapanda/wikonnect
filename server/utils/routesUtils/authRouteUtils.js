const bcrypt = require('bcrypt');
module.exports = async (ctx, next) => {
  if (ctx.request.body.auth.newPassword === ctx.request.body.auth.verifyPassword) {
    const hash = await bcrypt.hash(ctx.request.body.auth.newPassword, 10);
    delete ctx.request.body.auth.newPassword;
    delete ctx.request.body.auth.verifyPassword;
    ctx.request.body.auth.hash = hash;
  }
  await next();
};
