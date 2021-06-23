const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');
const UserFollowerModel = require('../models/user-follower');
const { requireAuth } = require('../middleware/permController');
const log = require('../utils/logger');

const router = new Router({
  prefix: '/accounts-following'
});

/**
 * @api {get} /api/v1/accounts-following GET all accounts user follows
 * @apiName GET all accounts user follows
 * @apiGroup Accounts Following
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiSuccess {Object}  accountsFollowing Top level object
 * @apiSuccess {String}  accountsFollowing[id] the id of the following
 * @apiSuccess {String}  accountsFollowing[userId] the id of the user
 * @apiSuccess {String}  accountsFollowing[followingId] the id account user is following
 * @apiSuccess {String}  accountsFollowing[createdAt] date account following was created
 * @apiSuccess {String}  accountsFollowing[updatedAt] date account following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "accountsFollowing":[{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "followingId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }]
 *            }
 */
router.get('/', requireAuth, async ctx => {

  try {
    const userId = ctx.state.user.data.id;

    const accountsFollowing = await UserFollowerModel.query()
      .where('userId', userId);
    ctx.status = 200;
    ctx.body = { accountsFollowing };
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
 * @api {post} /api/v1/accounts-following POST user account following
 * @apiName POST a user account following
 * @apiGroup Accounts Following
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 *
 * @apiParam (Request Body)  {Object}  accountsFollowing Top level object
 * @apiParam (Request Body)  {String}  accountsFollowing[followingId] the id account user is following
 * @apiParam (Request Body)  {String}  [accountsFollowing[userId]=JWTToken.user.id] Id of the user enrolling.
 *
 * @apiSuccess {Object}  accountsFollowing Top level object
 * @apiSuccess {String}  accountsFollowing[id] the id of the following
 * @apiSuccess {String}  accountsFollowing[followingId] the id account user is following
 * @apiSuccess {String}  accountsFollowing[userId] the id of the user
 * @apiSuccess {String}  accountsFollowing[createdAt] date account following was created
 * @apiSuccess {String}  accountsFollowing[updatedAt] date account following was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "accountsFollowing":{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "followingId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }
 *            }
 *
 */
router.post('/', requireAuth, async ctx => {

  const creatorId = ctx.state.user.data.id;
  const obj = ctx.request.body.accountsFollowing;

  ctx.assert(obj && obj.followingId, 400, 'Invalid account data invalid');
  ctx.assert(obj.user !== creatorId, 400, 'User cannot follow their own account');

  try {

    const accountsFollowing = await UserFollowerModel.query()
      .insertAndFetch({ userId: creatorId, followingId: obj.followingId });
    ctx.status = 201;
    ctx.body = { accountsFollowing };
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
 * @api {delete} /api/v1/accounts-following/:id Unfollow account
 * @apiName Unfollow user account
 * @apiGroup Accounts Following
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
