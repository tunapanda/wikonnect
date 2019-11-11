const Router = require('koa-router');
const LearningPath = require('../models/learning_path');
const validatePostData = require('../middleware/validation/validatePostData');


const router = new Router({
  prefix: '/paths'
});

router.get('/', async ctx => {
  const learningpath = await LearningPath.query().eager('courses');
  ctx.status = 200;
  ctx.body = { learningpath };
});

router.get('/:id', async ctx => {
  const learningpath = await LearningPath.query().where('id', ctx.params.id).eager('courses');

  ctx.assert(learningpath, 404, 'Record does not exist');

  ctx.status = 200;
  ctx.body = { learningpath };
});

router.post('/', validatePostData, async ctx => {
  let newLearningPath = ctx.request.body;

  const learningpath = await LearningPath.query().insertAndFetch(newLearningPath);

  ctx.assert(learningpath, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { learningpath };

});
router.put('/:id', async ctx => {
  const learningpath_record = await LearningPath.query().findById(ctx.params.id);
  if (!learningpath_record) {
    ctx.throw(400, 'That learning path does not exist');
  }
  const learningpath = await LearningPath.query().patchAndFetchById(ctx.params.id, ctx.request.body);


  ctx.status = 201;
  ctx.body = { learningpath };
});
router.delete('/:id', async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id);
  if (!learningpath) {
    ctx.assert(learningpath, 401, 'No ID was found');
  }
  await LearningPath.query().delete().where({ id: ctx.params.id });
  
  ctx.status = 200;
  ctx.body = { learningpath };
});

module.exports = router.routes();
