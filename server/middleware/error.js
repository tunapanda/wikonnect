const log = require('../utils/logger');

module.exports = async function (ctx, next) {
  let err;
  try {
    await next();
  } catch (error) {
    err = error;
    log.info(err);

    if (typeof error === 'function') {
      err = error();
    }

    let status = err.status || 500;

    let message = err.message && status < 500 ? err.message : err.detail;

    log.error(`${ctx.method} ${ctx.url} - ${status} - ${message}`);

    if (status >= 500) {
      err.headers = Object.assign({}, err.headers, { 'Retry-After': 30 });
    }

    ctx.status = status;

    // for validation errors
    if (err.errors) {
      return ctx.body = { errors: err.errors, error_message: err.detail };
    }

    ctx.body = {
      status: status,
      message: message
    };
  }
};
