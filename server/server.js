const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const jwt = require('./middleware/jwt');
const path = require('path');
const koaQs = require('koa-qs');
const authenticate = require('./middleware/authenticate');

const app = new Koa();

const router = new Router({
  prefix: '/api/v1'
});

koaQs(app);

app.use(errorHandler);

app.use(logger);

app.use(bodyParser());

app.use(async function(ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      let errMessage = err.originalError ?
        err.originalError.message :
        err.message
      ctx.body = {
        error: errMessage
      };
      ctx.set("X-Status-Reason", errMessage)
    } else {
      throw err;
    }
  });
});

app.use(require('koa-static')(path.resolve(__dirname, './public')));

router.use(require('./routes/auth'));

router.get('/hello', jwt.authenticate, async ctx => {
  ctx.body = { user: 'You have acess to view this route' };
});

app.use(router.routes());

module.exports = app;
