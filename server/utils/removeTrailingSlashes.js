module.exports = function () {
  return async function (ctx, next) {
    if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'ci') {
      // if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      const redirectUrl = ctx.url
        .replace(/\/?(\?|#|$)/, '/$1');
      if (ctx.url !== redirectUrl && ctx.url !== '/') {
        ctx.redirect(redirectUrl);
        return;
      }
    }
    await next();
  };
};