const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');
const GroupMembers = require('../models/group_members');
const User = require('../models/user');
const { userRoles } = require('../utils/routesUtils/userRouteUtils');

const router = new Router({
  prefix: '/roles'
});



/**
* @api {get} /api/v1/roles/:id POST creating a new user + role type combination.
* @apiName GetAUsersRole
* @apiGroup Roles
*
* @apiParam {string} roles[user_id] id of a user that already exists
* @apiParam {string} roles[group_id] id of roles in the groups table
*
* @apiPermission none
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*       "id": "user1",
*       "roles": [{
*          "name": "admin",
*          "type": "roles"
*         }]
*     }
*
* @apiError {String} errors Bad Request.
*/

router.get('/:id', requireAuth, grantAccess('readAny', 'admin'), async ctx => {
  let user_role;

  try {
    user_role = await User.query().findById(ctx.params.id).mergeJoinEager('roles(selectName)');
    ctx.assert(user_role, 404, 'That is no role for that user.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, e.message] }); }
    throw e;
  }

  userRoles(user_role);

  ctx.status = 200;
  ctx.body = {
    'id': user_role.id,
    'roles': user_role.roles
  };
});



/**
* @api {get} /api/v1/roles POST creating a new user + role type combination.
* @apiName GetUserRoles
* @apiGroup Roles
*
* @apiParam {string} roles[user_id] id of a user that already exists
* @apiParam {string} roles[group_id] id of roles in the groups table
*
* @apiPermission none
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     [
*        {
*          "id": "user1",
*          "email": "user1@wikonnect.org",
*          "username": "user1",
*          "lastSeen": "2017-12-20 19:17:10",
*          "metadata": {
*              "profileComplete": "false",
*              "oneInviteComplete": "false",
*              "oneChapterCompletion": "false"
*          },
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z",
*          "profileUri": null,
*          "inviteCode": "user1",
*          "private": "true",
*          "tags": "{\"highschool\",\"primary\",\"university\"}",
*          "roles": [{
*             "name": "admin",
*             "type": "roles"
*           }]
*        },
*      ]
*
* @apiError {String} errors Bad Request.
*/

router.get('/', requireAuth, grantAccess('readAny', 'profile'), async ctx => {
  let user_role;

  try {
    user_role = await User.query().where(ctx.query).mergeJoinEager('roles(selectName)');
    ctx.assert(user_role, 404, 'That is no role for that user.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, e.message] }); }
    throw e;
  }

  userRoles(user_role);

  ctx.status = 200;
  ctx.body = user_role;
});

/**
* @api {post} /api/v1/roles POST creating a new user + role type combination.
* @apiName PostARole
* @apiGroup Roles
*
* @apiParam {string} roles[user_id] id of a user that already exists
* @apiParam {string} roles[group_id] id of roles in the groups table
*
* @apiPermission none
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*        "user": {
*          "id": "string",
*          "username": "string",
*          "inviteCode": "invited_by",
*          "createdAt": "string",
*          "updatedAt": "string",
*          "metadata": json_array
*        }
*     }
*
* @apiError {String} errors Bad Request.
*/

router.post('/:id', requireAuth, grantAccess('readAny', 'admin'), async ctx => {
  let group_roles;

  try {
    group_roles = await GroupMembers.query().patchAndFetchById(ctx.params.id, ctx.request.body.roles);
    ctx.assert(group_roles, 404, 'That user does not exist.');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, e.message] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = group_roles;
});


module.exports = router.routes();

