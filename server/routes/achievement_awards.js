const Router = require('koa-router');
const AchievementAward = require('../models/achievement_awards');
const { requireAuth } = require('../middleware/permController');


const router = new Router({
  prefix: '/achievementAwards'
});
router.get('/', requireAuth, async ctx => {
  const achievementAwards = await AchievementAward.query().where(ctx.query);
  ctx.assert(achievementAwards, 404, 'No matching record found');
  ctx.status = 200;
  ctx.body = { achievementAwards };
});

router.get('/:id', requireAuth, async ctx => {
  const achievementAwards = await AchievementAward.query().findById(ctx.params.id);
  ctx.assert(achievementAwards, 404, 'No matching record found');
  ctx.status = 200;
  ctx.body = { achievementAwards };
});

module.exports = router.routes();
