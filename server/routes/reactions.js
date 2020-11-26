const Router = require('koa-router');
const { requireAuth } = require('../middleware/permController');
const validateReaction = require('../middleware/validateRoutePostSchema/validateReaction');
const Reaction = require('../models/reaction');

const router = new Router({
  prefix: '/reactions'
});


/**
 * @api {get} /api/v1/reactions/ GET all reactions.
 * @apiName GetReactions
 * @apiGroup Reactions
 * @apiPermission none
 *
 * @apiParam (Optional Params) {String} reaction.id Chapter Id
 * @apiParam (Optional Params) {String} reaction[reaction] Reaction type (like|dislike|whatever).
 * @apiParam (Optional Params) {String} reaction[chapter_id] Chapter id.
 * @apiParam (Optional Params) {String} reaction[user_id] Authenticated user id
 *
 * @apiSuccess {Object[]} reaction list
 * @apiSuccess {String} reaction.id Reaction id
 * @apiSuccess {Object[]} Reaction[object] Reaction object data
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "reaction": [{
 *             "reaction": "like|dislike|whatever",
 *             "chapter": "chapter_id",
 *             "user": "authenticated_user_id"
 *         }]
 *      }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/', requireAuth, async ctx => {
  try {
    let reaction = await Reaction.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { reaction };
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }
});

/**
 * @api {get} /api/v1/reactions/:id GET a reaction by ID.
 * @apiName GetAReAction
 * @apiGroup Reactions
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 *
 * @apiParam {String} id Reaction Id
 *
 * @apiSuccess {Object[]} reaction list
 * @apiSuccess {String} reaction.id Reaction id
 * @apiSuccess {Object[]} reaction[object] Object data
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      reaction: {
 *          userId: 'user44',
 *          chapterId: 'chapter2',
 *          reaction: 'like',
 *          createdAt: '2020-11-25T12:56:52.895Z',
 *          updatedAt: '2020-11-25T12:56:52.895Z',
 *          id: 'IgDuJuUAAvo'
 *        }
 *     }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', requireAuth, async ctx => {
  const reaction = await Reaction.query().findById(ctx.params.id);
  if (!reaction) {
    ctx.assert(reaction, 404, 'no reaction by that ID');
  }
  ctx.status = 200;
  ctx.body = { reaction };
});



/**
 * @api {post} /api/v1/reaction/ POST a reaction.
 * @apiName PostAReaction
 * @apiGroup Reactions
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiParam (Optional Params) {String} reaction[id] Chapter Id
 * @apiParam (Optional Params) {String} reaction[reaction] Reaction type (like|dislike|whatever).
 * @apiParam (Optional Params) {String} reaction[chapter_id] Chapter id.
 * @apiParam (Optional Params) {String} reaction[user_id] Authenticated user id
 *
 *
 * @apiSampleRequest off
 *
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        reaction: {
 *          userId: 'user44',
 *          chapterId: 'chapter2',
 *          reaction: 'like',
 *          createdAt: '2020-11-25T12:56:52.895Z',
 *          updatedAt: '2020-11-25T12:56:52.895Z',
 *          id: 'IgDuJuUAAvo'
 *        }
 *     }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *
 */



router.post('/', validateReaction, requireAuth, async ctx => {
  let newReaction = ctx.request.body.reaction;
  console.log(newReaction);
  newReaction.userId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  const reaction = await Reaction.query().insertAndFetch(newReaction);

  ctx.status = 201;
  ctx.body = { reaction };
});



/**
 * @api {put} /api/v1/reactions/:id PUT using Id.
 * @apiName PutAReAction
 * @apiGroup Reactions
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 *
 * @apiParam {String} id Reaction Id
 *
 * @apiSuccess {Object[]} reaction list
 * @apiSuccess {String} reaction.id Reaction id
 * @apiSuccess {String} reaction.chapterId Chapter id.
 * @apiSuccess {String} reaction.userId Authenticated user id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      reaction: {
 *          userId: 'user44',
 *          chapterId: 'chapter2',
 *          reaction: 'like',
 *          createdAt: '2020-11-25T12:56:52.895Z',
 *          updatedAt: '2020-11-25T12:56:52.895Z',
 *          id: 'IgDuJuUAAvo'
 *        }
 *     }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.put('/:id', requireAuth, async ctx => {
  let putReaction = ctx.request.body.reaction;
  let reaction = await Reaction.query().patchAndFetchById(ctx.params.id, putReaction);
  if (!reaction) {
    this.throw(405, `Unable to update record with id ${ctx.params.id}`);
  }

  ctx.status = 201;
  ctx.body = { reaction };
});

/**
 * @api {delete} /api/v1/reactions/:id DELETE using Id.
 * @apiName DeleteAReAction
 * @apiGroup Reactions
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 *
 * @apiParam {String} id Reaction Id
 *
 * @apiSuccess {Object[]} reaction list
 * @apiSuccess {String} reaction.id Reaction id
 * @apiSuccess {String} reaction.chapterId Chapter id.
 * @apiSuccess {String} reaction.userId Authenticated user id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      reaction: {
 *          userId: 'user44',
 *          chapterId: 'chapter2',
 *          reaction: 'like',
 *          createdAt: '2020-11-25T12:56:52.895Z',
 *          updatedAt: '2020-11-25T12:56:52.895Z',
 *          id: 'IgDuJuUAAvo'
 *        }
 *     }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.delete('/:id', requireAuth, async ctx => {
  const reaction = await Reaction.query().delete().where({ id: ctx.params.id });
  if (!reaction) {
    ctx.assert(reaction, 401, 'Unable to delete');
  }

  ctx.status = 200;
  ctx.body = { reaction };
});


module.exports = router.routes();
