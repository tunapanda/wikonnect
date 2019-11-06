const Router = require('koa-router');
const Chapter = require('../models/chapter');
const validatePostData = require('../middleware/validation/validatePostData');

const router = new Router({
  prefix: '/chapter'
});

router.get('/:id', async ctx => {
  const chapter = await Chapter.query().where('id', ctx.params.id).eager('lesson');
  
  ctx.assert(chapter, 404, 'no lesson by that ID');

  ctx.status =  200;
  ctx.body = { chapter };
});

router.get('/', async ctx => {
  const chapter = await Chapter.query();
  ctx.status = 200;
  ctx.body = { chapter };
});


router.post('/', validatePostData,  async ctx => {
  let newChapter = ctx.request.body;

  const chapter = await Chapter.query().insertAndFetch(newChapter);

  ctx.assert(module, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { chapter };

});
router.put('/:id', async ctx => {
  const chapter = await Chapter.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!chapter) {
    ctx.throw(400, 'That learning path does not exist');
  }

  ctx.status = 201;
  ctx.body = { chapter };
});
router.delete('/:id', async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);
  await Chapter.query().delete().where({ id: ctx.params.id });
  
  ctx.throw(chapter, 401, 'No ID was provided');  
  ctx.status = 200;
  ctx.body = { chapter };
});

module.exports = router.routes();
