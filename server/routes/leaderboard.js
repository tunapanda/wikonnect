const Router = require('koa-router');
const User = require('../models/user');


const router = new Router({
  prefix: '/leaderboard'
});

router.get('/', async ctx => {
  const leaders = await User.query().where(ctx.query)
    .withGraphFetched(
      '[leaderboard()]'
    );

  ctx.assert(leaders, 401, 'Something went wrong');

  ctx.status = 200;
  ctx.body = { leaders };
});

module.exports = router.routes();
