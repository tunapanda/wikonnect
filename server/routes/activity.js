const Router = require('koa-router');
const Activity = require('../models/activity');
const validateActivity = require('../middleware/validation/validateActivity');

const router = new Router({
  prefix: '/activity'
});



router.get('/:id', async ctx => {
  const activity = await Activity.query().where('id', ctx.params.id);

  ctx.assert(activity, 404, 'no activity by that ID');

  ctx.status = 200;
  ctx.body = { activity };
});

router.get('/', async ctx => {
  const activity = await Activity.query();
  ctx.status = 200;
  ctx.body = { activity };
});


router.post('/', validateActivity, async ctx => {
  let newActivity = ctx.request.body;

  const activity = await Activity.query().insertAndFetch(newActivity);

  ctx.assert(activity, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { activity };

});
router.put('/:id', async ctx => {
  const activity = await Activity.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!activity) {
    ctx.throw(400, 'That activity does not exist');
  }

  ctx.status = 201;
  ctx.body = { activity };
});
router.delete('/:id', async ctx => {
  const activity = await Activity.query().findById(ctx.params.id);
  await Activity.query().delete().where({ id: ctx.params.id });

  ctx.assert(activity, 401, 'No ID was found');
  ctx.status = 200;
  ctx.body = { activity };
});

module.exports = router.routes();
