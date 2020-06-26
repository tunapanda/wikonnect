const Router = require('koa-router');

const Comment = require('../models/comment');
const { requireAuth, grantAccess } = require('../middleware/permController');


const router = new Router({
  prefix: '/comments'
});


/**
 * @api {get} / GET a comment
 * @apiName GetChapterComment
 * @apiGroup ChapterComments
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "comment": [{
 *         "id": String,
 *         "comment": String,
 *         "chapterId": String,
 *         "creatorId": String,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime
 *        }]
 *      }
 *
 */
router.get('/', requireAuth, grantAccess('readAny', 'path'), async ctx => {
  // let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let comment;
  try {
    comment = await Comment.query();
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e] });
    } else { ctx.throw(400, null, { errors: [e] }); }
    throw e;
  }
  if (!comment) {
    ctx.assert(comment, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { comment };

});




/**
 * @api {get} /:chapterId GET a comment
 * @apiName GetAChapterComment
 * @apiGroup ChapterComments
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {"comment": [{
 *          "id": String,
 *          "chapterId": String,
 *          "creatorId": String,
 *          "comment": String,
 *          "createdAt": DateTime,
 *          "updatedAt": DateTime
 *        }]
 *      }
 *
 */
router.get('/:id', requireAuth, grantAccess('readAny', 'path'), async ctx => {
  // let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let comment;
  try {
    comment = await Comment.query().where({ id: ctx.params.id });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e] });
    } else { ctx.throw(400, null, { errors: [e] }); }
    throw e;
  }
  if (!comment) {
    ctx.assert(comment, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { comment };

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
    ctx.assert(comment, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { comment };

});


/**
 * @api {put} /:chapterId PUT comment
 * @apiName PutAChapterComment
 * @apiGroup ChapterComments
 * @apiPermission authenticated user
 *
 */

router.put('/:id', requireAuth, grantAccess('updateOwn', 'path'), async ctx => {
  const comment_record = await Comment.query().findById(ctx.params.id);
  let commentData = ctx.request.body.comment;

  if (!comment_record) {
    ctx.throw(400, 'No chapter with that ID');
  }

  let comment;
  try {
    comment = await Comment.query().patchAndFetchById(ctx.params.id, commentData);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 201;
  ctx.body = { comment };

});

module.exports = router.routes();
