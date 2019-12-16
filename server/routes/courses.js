const Router = require('koa-router');
const Course = require('../models/course');
const queryStringSearch = require('../middleware/queryStringSearch');
const permController = require('../middleware/permController');
const { userPermissions } = require('../middleware/_helpers/roles');

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
  try {
    const course = await Course.query().where(ctx.query).eager('modules(selectNameAndId)');

    returnType(course);
    course.forEach(crse => {
      Object.keys(userPermissions)
        .forEach(perm => {
          if (ctx.state.user.role.toLowerCase() == 'superadmin') {
            userPermissions[perm] = 'true';
          }
          if (ctx.state.user.data.id === crse.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
            userPermissions[perm] = 'true';
            userPermissions.delete = 'false';
          }
          if (ctx.state.user.data.id != crse.creatorId) {
            userPermissions[perm] = 'true';
            userPermissions.update = 'false';
            userPermissions.create = 'false';
            userPermissions.delete = 'false';
          }
          if (course.status === 'draft' && ctx.state.user.data.id === crse.creatorId) {
            userPermissions.read = 'true';
            userPermissions.update = 'true';
          }

        });
    });

    ctx.status = 200;
    ctx.body = { course };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.get('/:id', permController.grantAccess('readAny', 'path'), async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  ctx.assert(course, 404, 'no lesson by that ID');

  returnType(course);
  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.role.toLowerCase() == 'admin' && ctx.state.user.data.id != course.creatorId) {
        userPermissions[perm] = 'true';
        userPermissions.update = 'false';
        userPermissions.create = 'false';
        userPermissions.delete = 'false';
      }
      if (ctx.state.user.data.id === course.creatorId && ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      } else {
        userPermissions.read = 'true';
        userPermissions.update = 'false';
        userPermissions.delete = 'false';
        userPermissions.create = 'false';
      }
      return course.permissions = userPermissions;
    });

  ctx.status = 200;
  ctx.body = { course };
});


router.post('/', permController.grantAccess('createAny', 'path'), validatePostData, async ctx => {
  let newCourse = ctx.request.body.course;

  let course;
  try {
    course = await Course.query().insertAndFetch(newCourse);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  ctx.assert(course, 401, 'Something went wrong');
  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === course.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      } else {
        userPermissions.read = 'true';
      }
    });

  ctx.status = 2001;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});

router.put('/:id', permController.grantAccess('deleteOwn', 'path'), async ctx => {

  let course;
  try {
    course = await Course.query().patchAndFetchById(ctx.params.id, ctx.request.body.course);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  if (!course) {
    ctx.throw(400, 'That course does not exist');
  }

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === course.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      }
    });

  ctx.status = 201;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});
router.delete('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });

  ctx.assert(course, 401, 'No ID was found');
  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
    });

  ctx.status = 200;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});

module.exports = router.routes();
