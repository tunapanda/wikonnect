const bcrypt = require('bcrypt');
module.exports = async (ctx, next) => {
  if (ctx.request.body.auth.new_password === ctx.request.body.auth.verify_password) {
    const hash = await bcrypt.hash(ctx.request.body.auth.new_password, 10);
    delete ctx.request.body.auth.newPassword;
    delete ctx.request.body.auth.verifyPassword;
    ctx.request.body.auth.hash = hash;
  }
  await next();
};
