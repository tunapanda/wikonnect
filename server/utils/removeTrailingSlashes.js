module.exports = function () {
  return async function (ctx, next) {
    if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'ci') {
<<<<<<< HEAD
      const redirectUrl = ctx.url.replace(/\/?(\?|#|$)/, '/$1');
=======
      // if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      const redirectUrl = ctx.url
        .replace(/\/?(\?|#|$)/, '/$1');
>>>>>>> origin/master
      if (ctx.url !== redirectUrl && ctx.url !== '/') {
        ctx.redirect(redirectUrl);
        return;
      }
<<<<<<< HEAD
      await next(); await next();
    }
=======
    }
    await next();
>>>>>>> origin/master
  };
};