const Router = require('koa-router');
const Module = require('../models/module');
const permController = require('../middleware/permController');
const { userPermissions } = require('../middleware/_helpers/roles');
const { validateModules } = require('../middleware/validation/validatePostData');
const { anonymousUser, returnType, insertType, permissionsType } = require('../utils/userProgress/moduleRouteUtils');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/modules'
});

router.get('/:id', permController.requireAuth, async ctx => {
  const modules = await Module.query().findById(ctx.params.id).eager('lessons(selectNameAndId)');
  ctx.assert(modules, 404, 'No matching record found');

  await anonymousUser(modules, ctx.state.user.data.id);
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

router.get('/', permController.requireAuth, async ctx => {
  try {
    const modules = await Module.query().where(ctx.query).eager('lessons(selectNameAndId)');

    await anonymousUser(modules, ctx.state.user.data.id);
    returnType(modules);

    ctx.status = 200;
    modules['permissions'] = await permissionsType(ctx.state.user, modules);
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
router.put('/:id', permController.requireAuth, permController.grantAccess('updateOwn', 'path'), async ctx => {
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
router.delete('/:id', permController.requireAuth, permController.grantAccess('deleteOwn', 'path'), async ctx => {

  let modules;
  try {
    modules = await Module.query().findById(ctx.params.id);
    await Module.query().delete().where({ id: ctx.params.id });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = { modules };
});

module.exports = router.routes();