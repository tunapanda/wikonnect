const Router = require('koa-router');
const LearningPath = require('../models/learning_path');
const validateNewLearningPath = require('../middleware/validation/validateLearningPath');


const router = new Router({
  prefix: '/paths'
});

router.get('/', async ctx => {
  const learningpath = await LearningPath.query();
  ctx.status = 200;
  ctx.body = { learningpath };
});
router.post('/', validateNewLearningPath, async ctx => {
  let newLearningPath = ctx.request.body;

  const learningpath = await LearningPath.query().insertAndFetch(newLearningPath);

  ctx.assert(learningpath, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { learningpath };

});
router.put('/:id', async ctx => {
  const learningpath = await LearningPath.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!learningpath) {
    ctx.throw(400, 'That learning path does not exist');
  }

  ctx.status = 201;
  ctx.body = { learningpath };
});
router.delete('/:id', async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id);
  await LearningPath.query().delete().where({ id: ctx.params.id });
  
  ctx.assert(learningpath, 401, 'No ID was found');
  ctx.status = 200;
  ctx.body = { learningpath };
});

module.exports = router.routes();
