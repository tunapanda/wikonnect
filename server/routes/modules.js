const Router = require('koa-router');
const Module = require('../models/module');
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
    knex(model).insert(data);
  }
}


router.get('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id).eager('lessons(selectNameAndId)');

  ctx.assert(modules, 404, 'No matching record found');

  returnType(modules);

  modules.forEach(child => {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
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
  ctx.body = { modules };
});

router.get('/', async ctx => {
  try {
    const modules = await Module.query().where(ctx.query).eager('lessons(selectNameAndId)');

    returnType(modules);

    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (ctx.state.user.role.toLowerCase() == 'admin' && ctx.state.user.data.id != modules.creatorId) {
          userPermissions[perm] = 'true';
          userPermissions.update = 'false';
          userPermissions.create = 'false';
          userPermissions.delete = 'false';
        } else if (ctx.state.user.data.id === modules.creatorId && ctx.state.user.role.toLowerCase() == 'admin') {
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

  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.post('/', validateModules, async ctx => {

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
router.put('/:id', async ctx => {
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