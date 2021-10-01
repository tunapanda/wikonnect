const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');
const User = require('../models/user');

const router = new Router({
  prefix: '/leaderboard'
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

router.get('/', requireAuth, async ctx => {
  const users = await User.query()
                        .withGraphJoined('badgesAwarded')
                        // .whereNotNull();

  ctx.status = 200;
  ctx.body = { users };
});


module.exports = router.routes();
