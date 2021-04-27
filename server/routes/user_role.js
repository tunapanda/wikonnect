const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');
const groupMembers = require('../models/group_members');

const router = new Router({
  prefix: '/userRole'
});


/**
 * @api {get} /api/v1/userRole GET all user roles
 * @apiName Get user roles
 * @apiGroup UserRole
 * @apiPermission authenticated user[moderator/admin/superadmin]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id user role id
 *
 * @apiParam (Query Params) {Boolean} [userId] filter by userId
 * @apiParam (Query Params) {String} [groupId] filter by groupId
 *
 * @apiSuccess {Object} user_role Top level object
 * @apiSuccess {String} user_role[userId] users id
 * @apiSuccess {String} user_role[groupId] associated group name Id
 * @apiSuccess {String} user_role[createdAt] date created
 * @apiSuccess {String} user_role[updatedAt] date updated
 * @apiSuccess {String} user_role[group] group details object
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "user_role": [
 *          {
 *            "userId": "user1",
 *            "groupId": "groupAdmin",
 *            "createdAt": "2019-12-20T16:17:10.000Z",
 *            "updatedAt": "2019-12-20T16:17:10.000Z",
 *            "group": [{
 *                "id": "groupAdmin",
 *                "name": "admin",
 *                "slug": "role-admin",
 *                "description": "",
 *                "metadata": null,
 *                "createdAt": "2019-12-20T16:17:10.000Z",
 *                "updatedAt": "2019-12-20T16:17:10.000Z",
 *                "type": "userRoles"
 *            }]
 *          }
 *      ]
 *
 */

router.get('/', requireAuth, grantAccess('readAny', 'private'), async ctx => {
  const user_role = await groupMembers.query().where(ctx.query).withGraphFetched('group');
  ctx.assert(user_role, 404, 'No users with roles yet');

  ctx.status = 200;
  ctx.body = { user_role };
});
/**
 * @api {get} /api/v1/userRole/:id GET user role by userId
 * @apiName Get user role by userId
 * @apiGroup UserRole
 * @apiPermission authenticated user[moderator/admin/superadmin]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id user role id
 *
 * @apiParam (Query Params) {Boolean} [userId] filter by userId
 * @apiParam (Query Params) {String} [groupId] filter by groupId
 *
 * @apiSuccess {Object} user_role Top level object
 * @apiSuccess {String} user_role[userId] users id
 * @apiSuccess {String} user_role[groupId] associated group name Id
 * @apiSuccess {String} user_role[createdAt] date created
 * @apiSuccess {String} user_role[updatedAt] date updated
 * @apiSuccess {String} user_role[group] group details object
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "user_role": [
 *          {
 *            "userId": "user1",
 *            "groupId": "groupAdmin",
 *            "createdAt": "2019-12-20T16:17:10.000Z",
 *            "updatedAt": "2019-12-20T16:17:10.000Z",
 *            "group": [{
 *                "id": "groupAdmin",
 *                "name": "admin",
 *                "slug": "role-admin",
 *                "description": "",
 *                "metadata": null,
 *                "createdAt": "2019-12-20T16:17:10.000Z",
 *                "updatedAt": "2019-12-20T16:17:10.000Z",
 *                "type": "userRoles"
 *            }]
 *          }
 *      ]
 *
 */
router.get('/:id', requireAuth, grantAccess('readAny', 'private'), async ctx => {
  let stateUserId = ctx.state.user.id === undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let userId = (ctx.params.id !== 'current' || ctx.params.id !== 'me') ? stateUserId : ctx.params.id;

  const user_role = await groupMembers.query().where('user_id', userId).withGraphFetched('group');
  ctx.assert(user_role, 404, 'The current user has no role yet');
  ctx.status = 200;
  ctx.body = { user_role };
});


/**
 * @api {put} /api/v1/userRole/:id PUT user role by userId
 * @apiName Put user role by userId
 * @apiGroup UserRole
 * @apiPermission authenticated user[moderator/admin/superadmin]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id user id
 * @apiParam (Params) {String} groupId New group id to be updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "user_role": [{
 *            "userId": "user1",
 *            "groupId": "groupBasic",
 *            "createdAt": "2019-12-20T16:17:10.000Z",
 *            "updatedAt": "2021-04-26T20:11:24.764Z"
 *        }]
 *      }
 *
 */

router.put('/:id', requireAuth, grantAccess('updateAny', 'private'), async ctx => {
  const userId = ctx.params.id;
  const data = ctx.request.body.user_role;
  const user_role = await groupMembers.query()
    .patch(data)
    .where({ 'user_id': userId })
    .returning('*');
  ctx.status = 200;
  ctx.body = { user_role };
});

module.exports = router.routes();
