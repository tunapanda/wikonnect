const Router = require('koa-router');
const Module = require('../models/module');
const { validateModules } = require('../middleware/validation/validatePostData');

const config = require('../knexfile.js')['development'];
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

  if (!modules) {
    ctx.assert(module, 404, 'No matching record found');
  }
  returnType(modules);

  ctx.status = 200;
  ctx.body = { modules };
});

router.get('/', async ctx => {
  try {
    const modules = await Module.query().where(ctx.query).eager('lessons(selectNameAndId)');

    returnType(modules);
    ctx.status = 200;
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

  ctx.assert(modules, 401, 'Something went wrong');

  ctx.status = 201;
  ctx.body = { modules };

});
router.put('/:id', async ctx => {
  let { lessons, ...newModule } = ctx.request.body.module;

  const modules = await Module.query().patchAndFetchById(ctx.params.id, newModule);

  if (!modules) {
    ctx.throw(400, 'That learning path does not exist');
  }

  await knex('module_lessons').where({ 'module_id': modules.id }).del();
  insertType('module_lessons', lessons, modules.id);

  ctx.status = 201;
  ctx.body = { modules };
});
router.delete('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id);
  await Module.query().delete().where({ id: ctx.params.id });

  ctx.throw(modules, 401, 'No ID was provided');
  ctx.status = 200;
  ctx.body = { modules };
});

module.exports = router.routes();
