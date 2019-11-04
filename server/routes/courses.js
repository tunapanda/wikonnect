const Router = require('koa-router');
const Course = require('../models/course');
const validateNewLearningPath = require('../middleware/validateLearningPath');


const router = new Router({
  prefix: '/course'
});

router.get('/', async ctx => {
  const course = await Course.query();
  ctx.status = 200;
  ctx.body = { course };
});
router.post('/', async ctx => {
  let newCourse = ctx.request.body;

  const course = await Course.query().insertAndFetch(newCourse);

  ctx.assert(course, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { course };

});
router.put('/:id', async ctx => {
  const course = await Course.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!course) {
    ctx.throw(400, 'That learning path does not exist');
  }

  ctx.status = 201;
  ctx.body = { course };
});
router.delete('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });
  ctx.status = 200;
  ctx.assert(course, 401, 'No ID was provided');
  ctx.body = { course };
});

module.exports = router.routes();
