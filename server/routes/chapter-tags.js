const Router = require('koa-router');

const ChapterModel = require('../models/chapter');


const router = new Router({
  prefix: '/chapter-tags'
});


/**
 * @api {get} /api/v1/chapter-tags GET all chapter tags
 * @apiName Get chapter tags
 * @apiGroup Chapter Tags
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} [Authorization]  Bearer << JWT here>>
 *
 *
 * @apiSuccess {Object[]} chapterTags Top level object
 * @apiSuccess {String} chapterTags[name] A label for the tag
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "chapterTags":[{"name": "Digital Literacy" }]
 *      }
 *
 *
 */
router.get('/', async (ctx) => {
  try {

    const chapters = await ChapterModel.query().select(['tags'])
      .whereNotNull('tags')
      .where('approved',true);

    const allTags = chapters.flatMap((chapter) => chapter.tags);

    const chapterTags = [...new Set(allTags)] //remove duplicates
      .map((t) => {return {name: t};});

    ctx.status = 200;
    ctx.body = {chapterTags};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }
});


module.exports = router.routes();
