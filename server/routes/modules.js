const Router = require('koa-router');
const Module = require('../models/module');
const validateNewLearningPath = require('../middleware/validateLearningPath');


const router = new Router({
  prefix: '/module'
});

router.get('/', async ctx => {
  const module = await Module.query();
  ctx.status = 200;
  ctx.body = { module };
});
router.post('/', async ctx => {
  let newModule = ctx.request.body;

  const module = await Module.query().insertAndFetch(newModule);

  ctx.assert(module, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { module };

});
router.put('/:id', async ctx => {
  const module = await Module.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!module) {
    ctx.throw(400, 'That learning path does not exist');
  }

  ctx.status = 201;
  ctx.body = { module };
});
router.delete('/:id', async ctx => {
  const module = await Module.query().findById(ctx.params.id);
  await Module.query().delete().where({ id: ctx.params.id });
  ctx.status = 200;
  ctx.assert(module, 401, 'No ID was provided');
  ctx.body = { module };
});

module.exports = router.routes();
