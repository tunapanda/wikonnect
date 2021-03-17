const Router = require('koa-router');
const Activity = require('../models/activity');
const validateActivity = require('../middleware/validateRoutePostSchema/validateActivity');


const router = new Router({
  prefix: '/activity'
});


router.get('/:id', async ctx => {
  const activity = await Activity.query().findById(ctx.params.id);

  if (!activity) {
    ctx.assert(activity, 404, 'no activity by that ID');
  }
  ctx.status = 200;
  ctx.body = { activity };
});

router.get('/', async ctx => {
  try {
    const activity = await Activity.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { activity };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});


router.post('/', validateActivity, async ctx => {
  let newActivity = ctx.request.body.activity;


  let activity;
  try {
    activity = await Activity.query().insertAndFetch(newActivity);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.assert(activity, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { activity };

});
router.put('/:id', async ctx => {

  const activity_record = await Activity.query().findById(ctx.params.id);
  ctx.assert(activity_record, 400, null, { errors: ['Bad Request'] });

  let activity;
  try {
    activity = await activity_record.$query().patchAndFetchById(ctx.params.id, ctx.request.body.activity);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 201;
  ctx.body = { activity };
});
router.delete('/:id', async ctx => {
  const activity = await Activity.query().findById(ctx.params.id);

  ctx.assert(activity, 400, 'No ID was found');
  await activity.$query().delete().where({ id: ctx.params.id });


  ctx.status = 200;
  ctx.body = { activity };
});

module.exports = router.routes();
