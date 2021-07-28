const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');
const groupModel = require('../models/group');

const router = new Router({
  prefix: '/groups'
});


/**
 * @api {get} /api/v1/groups GET all user groups
 * @apiName Get user groups
 * @apiGroup Group
 * @apiPermission authenticated user[moderator/admin/superadmin]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 */

router.get('/', requireAuth, grantAccess('readAny', 'private'), async ctx => {
  const groups = await groupModel.query();

  ctx.status = 200;
  ctx.body = { groups };
});
/**
 * @api {get} /api/v1/groups/:id GET group by id
 * @apiName Get group by id
 * @apiGroup Group
 * @apiPermission authenticated user[moderator/admin/superadmin]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id group id
 *
 *
 */
router.get('/:id', requireAuth, grantAccess('readAny', 'private'), async ctx => {

  const group = await groupModel.query().where('id', ctx.params.id);
  ctx.assert(group, 404, 'Group not found');
  ctx.status = 200;
  ctx.body = { group };
});



module.exports = router.routes();
