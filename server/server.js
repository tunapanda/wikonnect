const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const jwt = require('./middleware/jwt');
const path = require('path');
const koaQs = require('koa-qs');

const app = new Koa();

const router = new Router({
  prefix: '/api/v1'
});

koaQs(app);

app.use(errorHandler);

app.use(logger);

app.use(bodyParser());

app.use(jwt.authenticate);

app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      let errMessage = err.originalError ?
        err.originalError.message :
        err.message;
      ctx.body = {
        error: errMessage
      };
      ctx.set('X-Status-Reason', errMessage);
    } else {
      throw err;
    }
  });
});

app.use(require('koa-static')(path.resolve(__dirname, './public')));

router.use(require('./routes/auth'));

router.use(require('./routes/users'));

router.use(require('./routes/paths'));

router.use(require('./routes/modules'));

router.use(require('./routes/courses'));

router.use(require('./routes/lessons'));

router.use(require('./routes/chapters'));

router.use(require('./routes/activity'));

router.use(require('./routes/achievements'));


router.get('/hello', async ctx => {
  ctx.body = { user: 'You have acess to view this route' };
});

app.use(router.routes());

module.exports = app;
