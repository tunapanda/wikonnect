const Router = require('koa-router');
const AchievementAward = require('../models/achievement_awards');
const permController = require('../middleware/permController');


const router = new Router({
  prefix: '/achievementAwards'
});
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'profile'), async ctx => {
  const achievementAward = await AchievementAward.query();
  ctx.assert(achievementAward, 404, 'No matching record found');
  ctx.status = 200;
  ctx.body = { achievementAward };
});

module.exports = router.routes();
