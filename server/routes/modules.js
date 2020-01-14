const Router = require('koa-router');
const Module = require('../models/module');
const Lesson = require('../models/lesson');
const Achievement = require('../models/achievement');
const permController = require('../middleware/permController');
const { userPermissions } = require('../middleware/_helpers/roles');
const { validateModules } = require('../middleware/validation/validatePostData');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/modules'
});

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.lessons.forEach(lesson => {
      return lesson.type = 'lessons';
    });
  } else {
    parent.forEach(mod => {
      mod.lessons.forEach(lesson => {
        return lesson.type = 'lessons';
      });
    });
  }
}


async function insertType(model, collection, parent_id) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    let data = {
      'lesson_id': element,
      'module_id': parent_id
    };
    await knex(model).insert(data);
  }
}


router.get('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id).eager('lessons(selectNameAndId)');
  ctx.assert(modules, 404, 'No matching record found');

  returnType(modules);

  Object.keys(userPermissions)
    .forEach(perm => {
      if (!ctx.state.user) {
        userPermissions.read = 'true';
        userPermissions.update = 'false';
        userPermissions.delete = 'false';
        userPermissions.create = 'false';
      } else if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      } else if (ctx.state.user.data.role.toLowerCase() == 'admin' && ctx.state.user.data.id != modules.creatorId) {
        userPermissions[perm] = 'true';
        userPermissions.update = 'false';
        userPermissions.create = 'false';
        userPermissions.delete = 'false';
      } else if (ctx.state.user.data.id === modules.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      } else if (modules.status === 'draft' && ctx.state.user.data.id === modules.creatorId) {
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
  modules['permissions'] = userPermissions;
  ctx.body = { modules };
});

router.get('/', permController.grantAccess('readAny', 'path'), async ctx => {
  try {
    const modules = await Module.query().where(ctx.query).eager('lessons(selectNameAndId)');

    // get all achievements of a user
    const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);
    let achievementChapters = [];
    achievement.forEach(element => {
      if (element.targetStatus === 'completed') {
        achievementChapters.push(element.target);
      }
    });

    // get all lesson id ina module
    let lessonIds = [];
    modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        lessonIds.push(lesson.id);
      });
    });
    let lesson = await Lesson.query().eager('chapters(selectNameAndId)');

    // get all lessons with id in lessonIds
    let lessonsData = [];

    for (let less = 0; less < lessonIds.length; less++) {
      const element = lessonIds[less];
      if (element === lesson[less].id) {
        lessonsData.push(lesson[less].chapters);
      } else {
        console.log('no chapter');
      }
    }

    // calculate the lesson completion percentage
    let completionData = [];
    lessonsData.forEach(less => {
      // console.log(less.length, achievementChapters.length);

      let completionMetric = {
        type: 'percentage',
        percent: parseInt((achievementChapters.length / less.length) * 100)
      };
      completionData.push(completionMetric);
    });

    // aggregate completion of lesson in a modules
    let percentage = 0;
    completionData.forEach(element => {

      if (element.percent > 0) {

        percentage = percentage + element.percent;
      }
    });

    let completionPercentage = { 'progress': parseFloat((percentage / completionData.length)) };

    returnType(modules);

    modules.forEach(child => {
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
    modules.push(completionPercentage);
    modules['permissions'] = userPermissions;

    ctx.body = { modules };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

});

router.post('/', permController.grantAccess('createAny', 'path'), validateModules, async ctx => {

  let { lessons, ...newModule } = ctx.request.body.module;

  const modules = await Module.query().insertAndFetch(newModule);

  insertType('module_lessons', lessons, modules.id);

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === modules.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (modules.status === 'draft' && ctx.state.user.data.id === modules.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      } else {
        userPermissions.read = 'true';
      }
    });

  ctx.assert(modules, 401, 'Something went wrong');

  ctx.status = 201;
  modules['permissions'] = userPermissions;
  ctx.body = { modules };

});
router.put('/:id', permController.grantAccess('deleteOwn', 'path'), async ctx => {
  let { lessons, ...newModule } = ctx.request.body.module;

  const modules = await Module.query().patchAndFetchById(ctx.params.id, newModule);

  ctx.assert(modules, 400, 'That learning path does not exist');

  await knex('module_lessons').where({ 'module_id': modules.id }).del();
  insertType('module_lessons', lessons, modules.id);


  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === modules.creatorId || ctx.state.user.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (modules.status === 'draft' && ctx.state.user.data.id === modules.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      }
    });

  ctx.status = 201;
  modules['permissions'] = userPermissions;
  ctx.body = { modules };
});
router.delete('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id);
  await Module.query().delete().where({ id: ctx.params.id });
  ctx.assert(modules, 401, 'No ID was provided');

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
    });

  ctx.status = 200;
  ctx.body = { modules };
});

module.exports = router.routes();