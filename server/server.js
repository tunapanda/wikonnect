const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const jwt = require('./middleware/jwt');
const path = require('path');
const koaQs = require('koa-qs');
const User = require('./models/user');

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

app.use(async function (ctx, next) {
  if (ctx.state.authorization && ctx.state.authorization.split(' ')[0] === 'Bearer') {
    const userId = ctx.state.user.data.id;
    const exp = ctx.state.exp;
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      ctx.status = 401;
      ctx.body = {
        error: 'JWT token has expired, please login to obtain a new one'
      };
      return ctx;
    }
    ctx.locals.loggedInUser = await User.findById(userId);
    await next();
  } else {
    await next();
  }
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
  ctx.body = { user: 'You have access to view this route' };
});

app.use(router.routes());

module.exports = app;
