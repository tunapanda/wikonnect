const Sentry = require('@sentry/node');
const log = require('../utils/logger');

Sentry.init({ dsn: 'https://7f6be831c9764b1aacdeadc3197b4f55@o478432.ingest.sentry.io/5520951' });

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

    let message = err.message && status < 500 ? err.message : 'Sorry, an error has occurred.';

    log.info(`${ctx.method} ${ctx.url} - ${status} - ${message}`);

    if (status >= 500) {
      err.headers = Object.assign({}, err.headers, { 'Retry-After': 30 });
    }

    ctx.status = status;

    // for validation errors
    if (err.errors) {
      return ctx.body = { errors: err.errors, error_message: err.detail };
    }

    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });

    ctx.body = {
      status: status,
      message: message
    };
  }
};
