const Router = require('koa-router');

const User = require('../models/user');
const Achievement = require('../models/achievement');
const AchievementAward = require('../models/achievement_awards');
const log = require('../utils/logger');

const knex = require('../utils/knexUtil');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/achievements'
});

async function chapterCompletionAward(params) {
  let completed = await knex('achievements')
    .count('target')
    .select('target_status')
    .where({ 'user_id': params.userId })
    .groupBy('target', 'target_status')
    .having(knex.raw('count(target) > 0'));

  try {
    if (completed[0].count === 1) {
      await AchievementAward.query().insert({
        'name': 'completed 1 chapter',
        'achievementId': 'achievements14',
        'userId': params.userId
      });
      await User.query().patchAndFetchById(params.id, { 'metadata:oneChapterCompletion': 'true' });
    } else if (completed[0].count > 2) {
      await AchievementAward.query().insert({
        'name': 'completed 3 chapters',
        'achievementId': 'achievements15',
        'userId': params.userId
      });
      await User.query().patchAndFetchById(params.userId, { 'metadata:threeChapterCompletion': 'true' });
    }
  } catch (error) {
    log.info(error.message);
  }
}

router.get('/', requireAuth, async ctx => {
  try {
    let achievement = await Achievement.query().where(ctx.query);
    achievement.imageUrl = 'images/profile-placeholder.gif';
    ctx.status = 200;
    ctx.body = { achievement };
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }
});

router.get('/:id', requireAuth, async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievement };
});

router.post('/', requireAuth, async ctx => {
  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;

  const newAchievement = ctx.request.body.achievement;
  newAchievement.userId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  const achievement = await Achievement.query().insertAndFetch(newAchievement);

  if (stateUserRole != 'anonymous') {
    chapterCompletionAward(newAchievement);
  }


  ctx.status = 201;
  ctx.body = { achievement };
});
router.put('/:id', async ctx => {
  let putAchievement = ctx.request.body.achievement;
  const achievement_record = await Achievement.query().findById(ctx.params.id);

  if (!achievement_record) {
    ctx.throw(400, 'That achievement does not exist');
  }
  const achievement = await Achievement.query().patchAndFetchById(ctx.params.id, putAchievement);

  ctx.status = 201;
  ctx.body = { achievement };
});
router.delete('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);

  if (!achievement) {
    ctx.assert(achievement, 401, 'No ID was found');
  }

  await Achievement.query().delete().where({ id: ctx.params.id });
  ctx.status = 200;
  ctx.body = { achievement };
});


module.exports = router.routes();
