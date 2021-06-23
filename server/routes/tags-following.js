const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');

const TagFollowerModel = require('../models/tag-follower');
const { requireAuth } = require('../middleware/permController');
const log = require('../utils/logger');


const router = new Router({
  prefix: '/tags-following'
});


/**
 * @api {get} /api/v1/tags-following GET all tags user follows
 * @apiName GET all tags user follows
 * @apiGroup Tags Following
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiSuccess {Object}  tagsFollowing Top level object
 * @apiSuccess {String}  tagsFollowing[id] the id of the following
 * @apiSuccess {String}  tagsFollowing[tagId] the id of the tag user is following
 * @apiSuccess {String}  tagsFollowing[userId] the id of the user
 * @apiSuccess {String}  tagsFollowing[createdAt] date tag following was created
 * @apiSuccess {String}  tagsFollowing[updatedAt] date tag following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tagsFollowing":[{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "tagId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }]
 *            }
 */
router.get('/', requireAuth, async ctx => {

  try {
    const userId = ctx.state.user.data.id;

    const tagsFollowing = await TagFollowerModel.query()
      .where('userId', userId);
    ctx.status = 200;
    ctx.body = { tagsFollowing };
  } catch (e) {
    log.error(e);
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {post} /api/v1/tags-following POST a tag user follows
 * @apiName POST a tag user follows
 * @apiGroup Tags Following
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 *
 * @apiParam (Request Body)  {Object}  tagsFollowing Top level object
 * @apiParam (Request Body)  {String}  tagsFollowing[tagId] Id of the tag user wishes to follow
 * @apiParam (Request Body)  {String}  [tagsFollowing[userId]=JWTToken.user.id] Id of the user enrolling.
 *
 * @apiSuccess {Object}  tagsFollowing Top level object
 * @apiSuccess {String}  tagsFollowing[id] the id of the tag following enrollment
 * @apiSuccess {String}  tagsFollowing[tagId] the id of the tag user is following
 * @apiSuccess {String}  tagsFollowing[userId] the id of the user
 * @apiSuccess {String}  tagsFollowing[createdAt] date tag following was created
 * @apiSuccess {String}  tagsFollowing[updatedAt] date tag following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tagsFollowing":{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "tagId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }
 *            }
 *
 */
router.post('/', requireAuth, async ctx => {

  const creatorId = ctx.state.user.data.id;
  const obj = ctx.request.body.tagsFollowing;

  ctx.assert(obj && obj.tagId, 400, 'Invalid tag identifier provided');

  try {

    const tagsFollowing = await TagFollowerModel.query()
      .insertAndFetch({ userId: creatorId, tagId: obj.tagId });
    ctx.status = 201;
    ctx.body = { tagsFollowing };
  } catch (e) {
    log.error(e);
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['Already following the tag'] });
    }
    if (e instanceof ForeignKeyViolationError) {
      ctx.throw(400, null, { errors: ['Data provided is invalid'] });
    }
    if (e instanceof ConstraintViolationError) {
      ctx.throw(400, null, { errors: ['Data provided is invalid'] });
    }
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {delete} /api/v1/tags-following/:id Delete tag following
 * @apiName DELETE user tag following
 * @apiGroup Tags Following
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Tag following Id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const obj = await TagFollowerModel.query()
    .findById(ctx.params.id);

  ctx.assert(obj, 404, 'User not following the tag provided');

  try {
    await obj.$query().delete();
    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    log.error(e);
  }

});


module.exports = router.routes();
