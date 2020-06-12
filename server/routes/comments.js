const Router = require('koa-router');

const Comment = require('../models/comment');
const { requireAuth, grantAccess} = require('../middleware/permController');


const router = new Router({
  prefix: '/comments'
});


/**
 * @api {post} /:chapterId POST comment
 * @apiName PostAChapterComment
 * @apiGroup ChapterComments
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "comment": {
 *        "creatorId": { type: String },
 *        "comment": { type: String },
 *        "metadata": { type: JSON },
 *        "chapterId": { type: String }
 *      }
 *    }
 *
 */
router.post('/:id', requireAuth, grantAccess('createAny', 'path'), async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let newChapterComment = ctx.request.body.comment;
  newChapterComment.chapterId = ctx.params.id;
  newChapterComment.creatorId = stateUserId;

  let comment;
  try {
    comment = await Comment.query().insertAndFetch(newChapterComment);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e] });
    } else { ctx.throw(400, null, { errors: [e] }); }
    throw e;
  }
  if (!comment) {
    ctx.assert(module, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { comment };

});

module.exports = router.routes();
