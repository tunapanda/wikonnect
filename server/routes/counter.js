const Router = require('koa-router');
const Counter = require('../models/counter');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/counters'
});

router.get('/', async ctx => {
  try {
    let counter = await Counter.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { counter };
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }
});


router.get('/:id', async ctx => {
  const counter = await Counter.query().findById(ctx.params.id);
  if (!counter) {
    ctx.assert(counter, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { counter };
});

router.post('/', async ctx => {
  const newCounter = ctx.request.body.counter;
  let counter;
  try {
    // counter = await Counter.query().patch(newCounter).where({ chapterId: newCounter.chapterId, trigger: newCounter.trigger });
    counter = await Counter.query().insertAndFetch(newCounter);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }

  ctx.status = 201;
  ctx.body = { counter };
});


router.put('/:id', async ctx => {
  let putAchievement = ctx.request.body.achievement;
  const achievement_record = await Counter.query().findById(ctx.params.id);

  if (!achievement_record) {
    ctx.throw(400, 'That achievement does not exist');
  }
  const achievement = await Counter.query().patchAndFetchById(ctx.params.id, putAchievement);

  ctx.status = 201;
  ctx.body = { achievement };
});

router.delete('/:id', requireAuth, async ctx => {
  const achievement = await Counter.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 401, 'No ID was found');
  }

  await Counter.query().delete().where({ id: ctx.params.id });


  ctx.status = 200;
  ctx.body = { achievement };
});


module.exports = router.routes();