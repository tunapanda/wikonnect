const Router = require('koa-router');
const AchievementAward = require('../models/achievement_awards');
const permController = require('../middleware/permController');


const router = new Router({
  prefix: '/achievement_awards'
});
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'profile'), async ctx => {
  const achievementAward = await AchievementAward.query();
  if (!achievementAward) {
    ctx.assert(achievementAward, 404, 'no achievement_award by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievementAward };
});

router.get('/:id', permController.requireAuth, permController.grantAccess('readOwn', 'profile'), async ctx => {
  const achievementAward = await AchievementAward.query().findById(ctx.params.id);
  if (!achievementAward) {
    ctx.assert(achievementAward, 404, 'no achievement_award by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievementAward };
});

module.exports = router.routes();
