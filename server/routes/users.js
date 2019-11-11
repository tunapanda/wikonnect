const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const getUserByUsername = require('../middleware/authenticate');

const router = new Router({
  prefix: '/users'
});

async function createPasswordHash(ctx, next) {
  if (ctx.request.body.user.password) {
    const hash = await bcrypt.hash(ctx.request.body.user.password, 10);

    delete ctx.request.body.user.password;
    ctx.request.body.user.hash = hash;
  }
  await next();
}

router.post('/', validateAuthRoutes.validateNewUser, getUserByUsername, createPasswordHash, async ctx => {

  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();

  let newUser = ctx.request.body.user;

  const user = await User.query().insertAndFetch(newUser);

  ctx.assert(user, 401, 'Something went wrong.');

  ctx.status = 201;
  ctx.body = { user };
});

router.get('/:id', async ctx => {

  let user = await User.query().findById(ctx.params.id);

  ctx.assert(user, 404, 'No User With that Id');

  ctx.status = 200;

  ctx.body = { user };


});

router.get('/', async ctx => {

  let user = await User.query();

  if (ctx.query.username) {
    user.where('username', ctx.query.username);
    ctx.assert(user, 404, 'No User With that username');
  }

  ctx.status = 200;

  ctx.body = { user };
});

module.exports = router.routes();