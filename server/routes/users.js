const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const getUserByUsername = require('../middleware/authenticate');
const permController = require('../middleware/permController');
const jwt = require('../middleware/jwt');


const router = new Router({
  prefix: '/users'
});

/**
 *
 * @param {ctx.request.body.user} ctx
 * @param {*} next
 *
 * delete password in the ctx
 * return hashed password
 */
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

router.get('/:id', jwt.authenticate, permController.requireAuth, permController.grantAccess('readAny', 'profile'), async ctx => {
  const user = await User.query().findById(ctx.params.id);

  if (!user) {
    ctx.throw(404, 'No User With that Id');
  }

  ctx.status = 200;
  ctx.body = { user };

});
router.get('/', jwt.authenticate, permController.grantAccess('readAny', 'profile'), async ctx => {
  let user = User.query();

  if (ctx.query.username) {
    user.where('username', ctx.query.username);
    ctx.assert(user, 404, 'No User With that username');
  }

  user = await user;

  ctx.body = { user };
});

router.put('/:id', jwt.authenticate, permController.grantAccess('updateOwn', 'profile'), async ctx => {

  const user = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);

  ctx.assert(user, 404, 'That user does not exist.');

  ctx.status = 200;

  ctx.status = 200;
  ctx.body = { user };

});

module.exports = router.routes();