const Router = require('koa-router');
const Achievement = require('../models/achievement');
const knex = require('../utils/knexUtil');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/achievements'
});

router.get('/', async ctx => {
  try {
    const achievement = await Achievement.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { achievement };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});


/**
   * return the count of completed chapter
   * @param {object[]} dataRange
   * @return {Integer}
   */

router.get('/date/:startDate/:endDate', requireAuth, async ctx => {

  // const from = '2017-12-20';
  // const to = '2018-12-20';
  const from = ctx.params.startDate;
  const to = ctx.params.endDate;

  let achievement;
  try {
    achievement = await knex('achievements')
      .select()
      .where({ target_status: 'completed' })
      .whereBetween('created_at', [from, to]);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }



  ctx.status = 200;
  ctx.body = { achievement: achievement.length };
});

router.get('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievement };
});


router.post('/', requireAuth, async ctx => {
  const newAchievement = ctx.request.body.achievement;
  newAchievement.userId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  const achievement = await Achievement.query().insertAndFetch(newAchievement);

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
