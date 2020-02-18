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

  async function permObjects() {
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
    return modules.permissions = userPermissions;
  }

  ctx.status = 200;
  modules['permissions'] = await permObjects();
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
      ctx.throw(e.statusCode, null, { errors: ['bad Request'] });
    } else { ctx.throw(400, null, { errors: ['bad Request'] }); }
    throw e;
  }

});

router.post('/', validateModules, permController.requireAuth, permController.grantAccess('createAny', 'path'), async ctx => {


  let { lessons, ...newModule } = ctx.request.body.module;

  // const checkModules = await Module.query().findById(newModule.id);

  // if (checkModules) {
  //   ctx.throw(400, null, { errors: ['Bad Request'] });
  // }

  let modules;
  try {
    modules = await Module.query().insertAndFetch(newModule);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  await insertType('module_lessons', lessons, modules.id);

  async function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (ctx.state.user.data.id === modules.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else if (modules.status === 'draft' && ctx.state.user.data.id === modules.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        } else {
          userPermissions.read = 'true';
        }
      });
    return modules.permissions = userPermissions;
  }

  ctx.status = 201;
  modules['permissions'] = await permObjects();
  ctx.body = { modules };

});

router.put('/:id', permController.grantAccess('createAny', 'path'), async ctx => {
  let { lessons, ...newModule } = ctx.request.body.module;

  let modules;
  try {
    await Module.query().findById(ctx.params.id);
    modules = await Module.query().patchAndFetchById(ctx.params.id, newModule);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(401, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  await knex('module_lessons').where({ 'module_id': modules.id }).del();
  await insertType('module_lessons', lessons, modules.id);


  async function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (ctx.state.user.data.id === modules.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else if (modules.status === 'draft' && ctx.state.user.data.id === modules.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        }
      });
    return modules.permissions = userPermissions;
  }

  ctx.status = 201;
  modules['permissions'] = await permObjects();
  ctx.body = { modules };
});
router.delete('/:id',permController.grantAccess('deleteOwn', 'path'), async ctx => {
  let modules = await Module.query().findById(ctx.params.id);

  if (modules === undefined) {
    ctx.throw(400, null, { errors: ['Bad Request'] });
  }

  await Module.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { modules };
});

module.exports = router.routes();