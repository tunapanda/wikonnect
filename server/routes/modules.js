const Router = require('koa-router');
const Module = require('../models/module');
const validatePostData = require('../middleware/validation/validatePostData');
const queryStringSearch = require('../middleware/queryStringSearch');


const router = new Router({
  prefix: '/modules'
});

async function testModulesStuff(modules) {
  if (modules.length == undefined) {
    modules.lessons.forEach(lesson => {
      return lesson.type = 'lesson';
    });
  } else {
    modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        return lesson.type = 'lesson';
      });
    });
  }
}


router.get('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id).eager('lessons(selectNameAndId)');

  testModulesStuff(modules);
  ctx.assert(module, 404, 'no module by that ID');

  ctx.status = 200;
  ctx.body = { modules };
});

router.get('/', queryStringSearch, async ctx => {
  const modules = await Module.query().where(ctx.query).eager('lessons(selectNameAndId)');

  testModulesStuff(modules);
  ctx.status = 200;
  ctx.body = { modules };
});

router.post('/', validatePostData, async ctx => {
  let newModule = ctx.request.body;

  const modules = await Module.query().insertAndFetch(newModule);

  ctx.assert(modules, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { modules };

});
router.put('/:id', async ctx => {
  const modules = await Module.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!modules) {
    ctx.throw(400, 'That learning path does not exist');
  }

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
