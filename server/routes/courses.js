const Router = require('koa-router');
const Course = require('../models/course');
const validatePostData = require('../middleware/validation/validatePostData');
const queryStringSearch = require('../middleware/queryStringSearch');
const permController = require('../middleware/permController');


const router = new Router({
  prefix: '/courses'
});

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.modules.forEach(lesson => {
      return lesson.type = 'modules';
    });
  } else {
    parent.forEach(mod => {
      mod.modules.forEach(lesson => {
        return lesson.type = 'modules';
      });
    });
  }
}

router.get('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  if (!course) {
    ctx.assert(course, 404, 'no lesson by that ID');
  }
  returnType(course);

  ctx.status = 200;
  ctx.body = { course };
});

router.get('/', permController.grantAccess('readAny', 'path'), queryStringSearch, async ctx => {
  try{
    const course = await Course.query().where(ctx.query).eager('modules(selectNameAndId)');

    returnType(course);

    ctx.status = 200;
    ctx.body = { course };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
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
