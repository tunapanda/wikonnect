const Router = require('koa-router');

const ChapterFeedback = require('../models/chapter_feedback');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/chapterFeedback',
});

router.get('/', async (ctx) => {
  try {
    const chapterFeedback = await ChapterFeedback.query().where(ctx.query);

    ctx.assert(chapterFeedback, 401, "Something went wrong");
    ctx.status = 200;
    ctx.body = { chapterFeedback };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e] });
    } else {
      ctx.throw(400, null, { errors: [e] });
    }
    throw e;
  }
});

router.post('/', requireAuth, async (ctx) => {
  
  const newChapterFeedback = {...ctx.request.body.chapterFeedback};

  let chapterFeedback;
  try {
    chapterFeedback = await ChapterFeedback.query().insertAndFetch(
      newChapterFeedback
    );
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.data] });
    } else {
      ctx.throw(400, null, { errors: [e.nativeError] });
    }
    throw e;
  }
  ctx.assert(chapterFeedback, 401, 'Something went wrong');
  ctx.status = 201;
  ctx.body = { chapterFeedback };
});

module.exports = router.routes();
