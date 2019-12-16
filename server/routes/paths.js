const Router = require('koa-router');
const LearningPath = require('../models/learning_path');
const { roles, userPermissions } = require('../middleware/_helpers/roles');
const { validatePaths } = require('../middleware/validation/validatePostData');
const permController = require('../middleware/permController');

const router = new Router({
  prefix: '/paths'
});

/**
 *
 * @param {json} parent
 *
 * modify the parent object
 * return child relation object
 *
 */
async function returnType(parent) {
  try {
    if (parent.length == undefined) {
      parent.courses.forEach(lesson => {
        return lesson.type = 'courses';
      });
    } else {
      parent.forEach(mod => {
        mod.courses.forEach(lesson => {
          return lesson.type = 'courses';
        });
      });
    }
  } catch (error) {
    null;
  }
}

router.get('/', permController.grantAccess('readAny', 'path'), async ctx => {
  try {
    const learningpath = await LearningPath.query().where(ctx.query).eager('courses(selectNameAndId)');
    returnType(learningpath);

    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        }
        if (ctx.state.user.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else {
          userPermissions.read = 'true';
        }
      });

    ctx.status = 200;
    learningpath['permissions'] = userPermissions;
    ctx.body = { learningpath };

  } catch (error) {

    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist', userPermissions };

  }
});

router.get('/:id', permController.grantAccess('readAny', 'path'), async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id).eager('courses(selectNameAndId)');
  ctx.assert(learningpath, 404, 'No matching record found');
  returnType(learningpath);

  const permission = (ctx.state.user.data.id === learningpath.creatorId) ? roles.can(ctx.state.user.role).readOwn('path') : roles.can(ctx.state.user.role).readAny('path');

  if (!permission.granted) {
    ctx.status = 401;
    ctx.body = {
      error: 'You don\'t have enough permission to perform this action'
    };
    return ctx;
  }


  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      } else if (ctx.state.user.role.toLowerCase() == 'admin' && ctx.state.user.data.id != learningpath.creatorId) {
        userPermissions[perm] = 'true';
        userPermissions.update = 'false';
        userPermissions.create = 'false';
        userPermissions.delete = 'false';
      } else if (ctx.state.user.data.id === learningpath.creatorId && ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      } else if (learningpath.status === 'draft' && ctx.state.user.data.id === learningpath.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      } else {
        userPermissions.read = 'true';
        userPermissions.update = 'false';
        userPermissions.delete = 'false';
        userPermissions.create = 'false';
      }
    });

  ctx.status = 200;
  learningpath['permissions'] = userPermissions;
  ctx.body = { learningpath };
});


router.post('/', permController.grantAccess('createAny', 'path'), validatePaths, async ctx => {
  let newLearningPath = ctx.request.body.learningPath;

  let learningpath;
  try {
    learningpath = await LearningPath.query().insertAndFetch(newLearningPath);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }


  ctx.assert(learningpath, 401, 'Something went wrong');

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === learningpath.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (learningpath.status === 'draft' && ctx.state.user.data.id === learningpath.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      } else {
        userPermissions.read = 'true';
      }
    });

  ctx.status = 201;
  learningpath['permissions'] = userPermissions;
  ctx.body = { learningpath };
});

router.put('/:id', permController.grantAccess('updateOwn', 'path'), async ctx => {
  const learningpath_record = await LearningPath.query().findById(ctx.params.id);

  if (!learningpath_record) {
    ctx.throw(400, 'That learning path does not exist');
  }

  const newLearningPath = ctx.request.body.learningPath;

  let learningpath;
  try {
    learningpath = await LearningPath.query().patchAndFetchById(ctx.params.id, newLearningPath);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  ctx.assert(learningpath, 400, 'That learning path does not exist');

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === learningpath.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (learningpath.status === 'draft' && ctx.state.user.data.id === learningpath.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      }
    });

  ctx.status = 201;
  learningpath['permissions'] = userPermissions;
  ctx.body = { learningpath };
});

router.delete('/:id', permController.grantAccess('deleteAny', 'path'), async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id);
  if (!learningpath) {
    ctx.assert(learningpath, 401, 'No ID was found');
  }
  await LearningPath.query().delete().where({ id: ctx.params.id });

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
    });

  ctx.status = 200;
  learningpath['permissions'] = userPermissions;
  ctx.body = { learningpath };
});

module.exports = router.routes();
