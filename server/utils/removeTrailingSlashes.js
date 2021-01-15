module.exports = function () {
  return async function (ctx, next) {
    if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'ci') {
      const redirectUrl = ctx.url.replace(/\/?(\?|#|$)/, '/$1');
      if (ctx.url !== redirectUrl && ctx.url !== '/') {
        ctx.redirect(redirectUrl);
        return;
      }
      await next(); await next();
    }
  };
};