const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');
const UserFollowerModel = require('../models/user-follower');
const { requireAuth } = require('../middleware/permController');
const log = require('../utils/logger');

const router = new Router({
  prefix: '/user-followees'
});

/**
 * @api {get} /api/v1/user-followees GET all accounts users follows
 * @apiName GET all user followees
 * @apiGroup User Followees
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiSuccess {Object}  UserFollowees Top level object
 * @apiSuccess {String}  UserFollowees[id] the id of the following
 * @apiSuccess {String}  UserFollowees[userId] the id of the user
 * @apiSuccess {String}  UserFollowees[followeeId] the id account user is following
 * @apiSuccess {String}  UserFollowees[createdAt] date account following was created
 * @apiSuccess {String}  UserFollowees[updatedAt] date account following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "UserFollowees":[{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "followeeId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }]
 *            }
 */
router.get('/', requireAuth, async ctx => {

  try {
    const userId = ctx.state.user.data.id;

    const UserFollowees = await UserFollowerModel.query()
      .where('userId', userId);
    ctx.status = 200;
    ctx.body = { UserFollowees };
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
 * @api {post} /api/v1/User-followees POST user account following
 * @apiName POST a user account following
 * @apiGroup User Followees
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 *
 * @apiParam (Request Body)  {Object}  UserFollowee Top level object
 * @apiParam (Request Body)  {String}  UserFollowees[followeeId] the id account user is following
 * @apiParam (Request Body)  {String}  [UserFollowees[userId]=JWTToken.user.id] Id of the user followee.
 *
 * @apiSuccess {Object}  UserFollowee Top level object
 * @apiSuccess {String}  UserFollowee[id] the id of the following
 * @apiSuccess {String}  UserFollowee[followeeId] the id account user is following
 * @apiSuccess {String}  UserFollowee[userId] the id of the user
 * @apiSuccess {String}  UserFollowee[createdAt] date account following was created
 * @apiSuccess {String}  UserFollowee[updatedAt] date account following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "UserFollowee":{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "followeeId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }
 *            }
 *
 */
router.post('/', requireAuth, async ctx => {

  const creatorId = ctx.state.user.data.id;
  const obj = ctx.request.body.UserFollowee;

  ctx.assert(obj && obj.followeeId, 400, 'Invalid account data invalid');
  ctx.assert(obj.user !== creatorId, 400, 'User cannot follow their own account');

  try {

    const UserFollowee = await UserFollowerModel.query()
      .insertAndFetch({ userId: creatorId, followeeId: obj.followeeId });
    ctx.status = 201;
    ctx.body = { UserFollowee };
  } catch (e) {
    log.error(e);
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['User already following the account'] });
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
 * @api {delete} /api/v1/user-followees/:id Unfollow account
 * @apiName Unfollow user account
 * @apiGroup User Followees
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Account following Id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const obj = await UserFollowerModel.query()
    .findById(ctx.params.id);

  ctx.assert(obj, 404, 'User not following the account provided');

  try {
    await obj.$query().delete();
    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    log.error(e);
  }

});


module.exports = router.routes();
