module.exports = async function (ctx, next) {
  let err;
  try {
    await next();
  } catch (error) {
    err = error;
    if (typeof error === 'function') {
      err = error();
    }

    let status = err.status || 500;
    let message = err.message && status < 500
      ? err.message
      : 'Sorry, an error has occurred.';

    console.log(`${ctx.method} ${ctx.url} - ${status} - ${message}`);

    if (status >= 500) {
      console.log(err.stack);
    }

    ctx.status = status;

    // for validation errors
    if (err.errors) {
      return ctx.body = { errors: err.errors };
    }

    ctx.body = {
      status: status,
      message: message
    };
  }
};
