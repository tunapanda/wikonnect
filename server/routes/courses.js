const Router = require('koa-router');
const Course = require('../models/course');
const Module = require('../models/module');
const Lesson = require('../models/lesson');
const Achievement = require('../models/achievement');
const permController = require('../middleware/permController');
const { userPermissions } = require('../middleware/_helpers/roles');
const { validateCourses } = require('../middleware/validation/validatePostData');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

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

async function insertType(model, collection, course_id) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    let data = {
      'module_id': element,
      'course_id': course_id
    };
    await knex(model).insert(data);
  }
}

router.get('/', async ctx => {
  try {
    const course = await Course.query().where(ctx.query).eager('modules(selectNameAndId)');


    // get all achievements of a user
    const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);
    let achievementChapters = [];
    achievement.forEach(element => {
      if (element.targetStatus === 'completed') {
        achievementChapters.push(element.target);
      }
    });

    let modules = await Module.query().eager('lessons(selectNameAndId)');
    let lesson = await Lesson.query().eager('chapters(selectNameAndId)');

    course.forEach(cour => {
      for (let index = 0; index < cour.modules.length; index++) {
        const element = cour.modules[index];
        modules.forEach(mod => {
          if (element.id === mod.id) {
            for (let index = 0; index < mod.lessons.length; index++) {
              const element = mod.lessons[index];
              lesson.forEach(chap => {
                if (element.id === chap.id) {
                  let completionMetric = parseInt((achievementChapters.length / chap.chapters.length) * 100);
                  // console.log(completionMetric);
                  return cour.progress = completionMetric;
                }
              });
            }
          }
        });
      }
    });

    modules.forEach(mod => {
      for (let index = 0; index < mod.lessons.length; index++) {
        const element = mod.lessons[index];
        lesson.forEach(chap => {
          if (element.id === chap.id) {
            let completionMetric = parseInt((achievementChapters.length / chap.chapters.length) * 100);
            return mod.progress = completionMetric;
          }
        });
      }
    });
    returnType(course);

    course.forEach(child => {
      Object.keys(userPermissions)
        .forEach(perm => {
          if (!ctx.state.user) {
            userPermissions.read = 'true';
            userPermissions.update = 'false';
            userPermissions.delete = 'false';
            userPermissions.create = 'false';
          } else if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
            userPermissions[perm] = 'true';
          } else if (ctx.state.user.data.id === child.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
            userPermissions[perm] = 'true';
            userPermissions.delete = 'false';
          } else if (ctx.state.user.data.id != child.creatorId) {
            userPermissions.read = 'true';
            userPermissions.update = 'false';
            userPermissions.create = 'false';
            userPermissions.delete = 'false';
          } else if (child.status === 'draft' && ctx.state.user.data.id === child.creatorId) {
            userPermissions.read = 'true';
            userPermissions.update = 'true';
          }
          child.permission = userPermissions;
        });
    });

    ctx.status = 200;
    ctx.body = { course };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist', error: error.message };
  }
});

router.get('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  ctx.assert(course, 404, 'no lesson by that ID');

  returnType(course);

  function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (!ctx.state.user) {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.delete = 'false';
          userPermissions.create = 'false';
        } else if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (ctx.state.user.data.role.toLowerCase() == 'admin' && ctx.state.user.data.id != course.creatorId) {
          userPermissions[perm] = 'true';
          userPermissions.update = 'false';
          userPermissions.create = 'false';
          userPermissions.delete = 'false';
        } else if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        } else {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.delete = 'false';
          userPermissions.create = 'false';
        }

      });
    return course.permissions = userPermissions;
  }
  ctx.status = 200;
  course['permissions'] = permObjects();
  ctx.body = { course };
});


router.post('/', permController.grantAccess('readAny', 'path'), validateCourses, async ctx => {
  let { modules, ...newCourse } = ctx.request.body.course;

  let course;
  try {
    course = await Course.query().insertAndFetch(newCourse);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
  insertType('course_modules', modules, course.id);

  function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        }
        if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        }
        if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
          // } else {
          //   userPermissions.read = 'true';
        }
      });
    return course.permissions = userPermissions;
  }

  ctx.status = 201;
  course['permissions'] = permObjects();
  ctx.body = { course };
});

router.put('/:id', permController.grantAccess('deleteOwn', 'path'), async ctx => {
  const course_record = await Course.query().findById(ctx.params.id);
  if (!course_record) {
    ctx.throw(400, 'That course does not exist');
  }
  let { modules, ...newCourse } = ctx.request.body.course;

  let course;
  try {
    course = await Course.query().patchAndFetchById(ctx.params.id, newCourse);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  await knex('course_modules').where({ 'course_id': course.id }).del();
  insertType('course_modules', modules, course.id);

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
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
      if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
    });

  ctx.status = 200;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});

module.exports = router.routes();
