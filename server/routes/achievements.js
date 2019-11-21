const Router = require('koa-router');
const Achievement = require('../models/achievement');
const validateAchievement = require('../middleware/validation/validateAchievement');
const queryStringSearch = require('../middleware/queryStringSearch');

const router = new Router({
  prefix: '/achievements'
});


router.get('/', queryStringSearch, async ctx => {
  try {
    const achievement = await Achievement.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { achievement };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.get('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievement };
});


router.post('/', validateAchievement, async ctx => {
  let newAchievement = ctx.request.body;

  const achievement_record = await Achievement.query().where('id', newAchievement.id);

  if (achievement_record.length > 0) {
    ctx.throw(401, 'record already exists');
  }

  const achievement = await Achievement.query().insertAndFetch(newAchievement);

  ctx.status = 201;

  ctx.body = { achievement };

});
router.put('/:id', async ctx => {

  const achievement_record = await Achievement.query().findById(ctx.params.id);

  if (!achievement_record) {
    ctx.throw(400, 'That achievement does not exist');
  }
  const achievement = await Achievement.query().patchAndFetchById(ctx.params.id, ctx.request.body);


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
