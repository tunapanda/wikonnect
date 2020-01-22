const Router = require('koa-router');
const Chapter = require('../models/chapter');
const Achievement = require('../models/achievement');
const validateChapter = require('../middleware/validation/validateChapter');
const busboy = require('async-busboy');
const path = require('path');
const unzipper = require('unzipper');

const router = new Router({
  prefix: '/chapters'
});

async function returnChapterStatus(chapter, achievement) {
  if (chapter.length == undefined) {
    achievement.forEach(ach => {
      if (chapter.id == ach.target) {
        return chapter.targetStatus = ach.targetStatus;
      }
    });
  } else {
    chapter.forEach(chap => {
      achievement.forEach(ach => {
        if (chap.id == ach.target) {
          return chap.targetStatus = ach.targetStatus;
        }
      });
    });
  }
}

router.get('/', async ctx => {
  try {
    const chapter = await Chapter.query().where(ctx.query);
    const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);

    returnChapterStatus(chapter, achievement);

    ctx.status = 200;
    ctx.body = { chapter };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.get('/:id', async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);
  ctx.assert(chapter, 404, 'no lesson by that ID');

  const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);
  returnChapterStatus(chapter, achievement);

  ctx.status = 200;
  ctx.body = { chapter };
});

router.post('/', validateChapter, async ctx => {
  let newChapter = ctx.request.body.chapter;

  newChapter.slug = newChapter.name.replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-*|-*$/g, '')
    .toLowerCase();

  let chapter;
  try {
    chapter = await Chapter.query().insertAndFetch(newChapter);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  if (!chapter) {
    ctx.assert(module, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { chapter };

});
router.put('/:id', async ctx => {
  const chapter_record = await Chapter.query().findById(ctx.params.id);

  if (!chapter_record) {
    ctx.throw(400, 'No chapter with that ID');
  }
  let chapter;
  try {
    chapter = await Chapter.query().patchAndFetchById(ctx.params.id, ctx.request.body.chapter);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 201;
  ctx.body = { chapter };
});
router.delete('/:id', async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);

  if (!chapter) {
    ctx.assert(chapter, 401, 'No ID was found');
  }
  await Chapter.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { chapter };
});

router.post('/:id/upload', async ctx => {
  const dirName = ctx.params.id;
  const uploadPath = `uploads/H5P/${dirName}`;
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  await busboy(ctx.req, {
    onFile: function (fieldname, file) {
      file.pipe(unzipper.Extract({ path: uploadDir }));
    }
  });
  // ctx.assert(files.length, 400, 'No files sent.');
  // ctx.assert(files.length === 1, 400, 'Too many files sent.');

  ctx.body = {
    host: ctx.host,
    path: uploadPath
  };


});

module.exports = router.routes();
