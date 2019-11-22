const Router = require('koa-router');
const Lesson = require('../models/lesson');
const validatePostData = require('../middleware/validation/validatePostData');
const queryStringSearch = require('../middleware/queryStringSearch');


const router = new Router({
  prefix: '/lessons'
});

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.chapters.forEach(lesson => {
      return lesson.type = 'chapters';
    });
  } else {
    parent.forEach(mod => {
      mod.chapters.forEach(lesson => {
        return lesson.type = 'chapters';
      });
    });
  }
}

router.get('/:id', async ctx => {
  const lesson = await Lesson.query().findById(ctx.params.id).eager('chapters(selectNameAndId)');

  if (!lesson) {
    ctx.assert(lesson, 404, 'no lesson by that ID');
  }
  returnType(lesson);
  ctx.status = 200;
  ctx.body = { lesson };
});

router.get('/', queryStringSearch, async ctx => {
  try {
    const lesson = await Lesson.query().where(ctx.query).eager('chapters(selectNameAndId)');

    returnType(lesson);

    ctx.status = 200;
    ctx.body = { lesson };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };

  }
});

router.post('/', validatePostData, async ctx => {
  let newLesson = ctx.request.body;

  const lesson = await Lesson.query().insertAndFetch(newLesson);

  ctx.assert(lesson, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { lesson };

});
router.put('/:id', async ctx => {
  const lesson_record = await Lesson.query().findById(ctx.params.id);
  if (!lesson_record) {
    ctx.throw(400, 'That lesson path does not exist');
  }
  const lesson = await Lesson.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  ctx.status = 201;
  ctx.body = { lesson };
});
router.delete('/:id', async ctx => {
  const lesson = await Lesson.query().findById(ctx.params.id);

  if (!lesson) {
    ctx.throw(lesson, 401, 'No record with id');
  }
  await Lesson.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { lesson };
});

module.exports = router.routes();
