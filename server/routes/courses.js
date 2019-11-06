const Router = require('koa-router');
const Course = require('../models/course');
const validatePostData = require('../middleware/validation/validatePostData');


const router = new Router({
  prefix: '/course'
});


router.get('/:id', async ctx => {
  const course = await Course.query().where('id', ctx.params.id).eager('modules');
  
  ctx.assert(course, 404, 'no lesson by that ID');

  ctx.status =  200;
  ctx.body = { course };
});

router.get('/', async ctx => {
  const course = await Course.query();
  ctx.status = 200;
  ctx.body = { course };
});

router.post('/', validatePostData, async ctx => {
  let newCourse = ctx.request.body;

  const course = await Course.query().insertAndFetch(newCourse);

  ctx.assert(course, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { course };

});
router.put('/:id', async ctx => {
  const course = await Course.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!course) {
    ctx.throw(400, 'That course does not exist');
  }

  ctx.status = 201;
  ctx.body = { course };
});
router.delete('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });

  ctx.assert(course, 401, 'No ID was found');
  ctx.status = 200;
  ctx.body = { course };
});

module.exports = router.routes();
