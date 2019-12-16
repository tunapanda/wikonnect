const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const jwt = require('./middleware/jwt');
const path = require('path');
const koaQs = require('koa-qs');
const permController = require('./middleware/permController');
const User = require('./models/user');
const jwToken = require('jsonwebtoken');

const app = new Koa();

const router = new Router({
  prefix: '/api/v1'
});

koaQs(app);

app.use(errorHandler);

app.use(logger);

app.use(bodyParser());

// app.use(jwt.authenticate);


app.use(permController.requireAuth);

app.use(async function (ctx, next) {
  if (ctx.request.header.authorization && ctx.request.header.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    const { exp, data } = await jwToken.verify(accessToken, 'secret');

    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      ctx.status = 401;
      ctx.body = {
        error: 'JWT token has expired, please login to obtain a new one'
      };
      return ctx;
    }
    ctx.state.user = await User.query().findById(data.id);
    await next();
  } else {
    await next();
  }
});


app.use(require('koa-static')(path.resolve(__dirname, './public')));

router.use(require('./routes/auth'));

router.use(require('./routes/users'));

router.use(jwt.authenticate, require('./routes/paths'));

router.use(jwt.authenticate, require('./routes/modules'));

router.use(jwt.authenticate, require('./routes/courses'));

router.use(jwt.authenticate, require('./routes/lessons'));

router.use(jwt.authenticate, require('./routes/chapters'));

router.use(jwt.authenticate, require('./routes/activity'));

router.use(jwt.authenticate, require('./routes/achievements'));
router.use(require('./routes/search'));

router.get('/hello', async ctx => {
  ctx.body = { user: 'You have access to view this route' };
});

app.use(router.routes());

module.exports = app;
