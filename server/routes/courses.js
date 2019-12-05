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

router.get('/', permController.grantAccess('readAny', 'path'), queryStringSearch, async ctx => {
  try{
    const course = await Course.query().where(ctx.query).eager('modules(selectNameAndId)');

    returnType(course);
    const userPermissions = ctx.state.user.attributes;

    ctx.status = 200;
    ctx.body = { course, userPermissions };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});


router.get('/:id', permController.grantAccess('readAny', 'path'), async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  ctx.assert(course, 404, 'no lesson by that ID');

  returnType(course);
  const userPermissions = ctx.state.user.attributes;

  ctx.status = 200;
  ctx.body = { course, userPermissions };
});


router.post('/', permController.grantAccess('createAny', 'path'), validatePostData, async ctx => {
  let newCourse = ctx.request.body;

  const course = await Course.query().insertAndFetch(newCourse);

  ctx.assert(course, 401, 'Something went wrong');
  const userPermissions = ctx.state.user.attributes;

  ctx.status = 2001;
  ctx.body = { course, userPermissions };
});
router.put('/:id', permController.grantAccess('deleteOwn', 'path'), async ctx => {
  const course = await Course.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!course) {
    ctx.throw(400, 'That course does not exist');
  }

  const userPermissions = ctx.state.user.attributes;

  ctx.status = 201;
  ctx.body = { course, userPermissions };
});
router.delete('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });

  ctx.assert(course, 401, 'No ID was found');
  const userPermissions = ctx.state.user.attributes;

  ctx.status = 200;
  ctx.body = { course, userPermissions };
});

module.exports = router.routes();
