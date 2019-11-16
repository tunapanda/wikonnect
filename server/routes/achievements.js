const Router = require('koa-router');
const Achievement = require('../models/achievement');
const validateAchievement = require('../middleware/validation/validateAchievement');
const queryStringSearch = require('../middleware/queryStringSearch');

const router = new Router({
  prefix: '/achievement'
});


router.get('/', queryStringSearch, async ctx => {
  const achievement = await Achievement.query().where(ctx.query);
  ctx.status = 200;
  ctx.body = { achievement };
});

router.get('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params);

  ctx.assert(achievement, 404, 'no achievement by that ID');

  ctx.status = 200;
  ctx.body = { achievement };
});


router.post('/', validateAchievement, async ctx => {
  let newAchievement = ctx.request.body;

  const achievement = await Achievement.query().insertAndFetch(newAchievement);

  ctx.assert(achievement, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { achievement };

});
router.put('/:id', async ctx => {
  const achievement = await Achievement.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!achievement) {
    ctx.throw(400, 'That achievement does not exist');
  }

  ctx.status = 201;
  ctx.body = { achievement };
});
router.delete('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  await Achievement.query().delete().where({ id: ctx.params.id });

  ctx.assert(achievement, 401, 'No ID was found');
  ctx.status = 200;
  ctx.body = { achievement };
});

module.exports = router.routes();
