const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/userRole'
});

router.get('/', requireAuth, async ctx => {
  const group_members = await knex().from('group_members').join('groups', { 'group_members.group_id': 'groups.id' });
  ctx.assert(group_members, 404, 'No users with roles yet');

  ctx.status = 200;
  ctx.body = { group_members };
});

router.get('/user', requireAuth, async ctx => {
  const group_members = await knex('group_members')
    .where('user_id', knex.raw('?', [ctx.state.user.data.id]))
    .join('groups', { 'group_members.group_id': 'groups.id' });
  ctx.assert(group_members, 404, 'The current user has no role yet');

  ctx.status = 200;
  ctx.body = { group_members };
});

router.post('/', requireAuth, grantAccess('updateAny', 'path'), async ctx => {
  const group_members = await knex()
    .insert(
      [{ 'user_id': knex.raw('?', [ctx.query.user_id]), 'group_id': knex.raw('?', [ctx.query.group_id]) }],
      ['user_id', 'group_id'])
    .into('group_members');

  ctx.status = 200;
  ctx.body = { group_members };
});


router.put('/:id', requireAuth, async ctx => {
  const group_members = await knex('group_members')
    .where({ 'user_id': knex.raw('?', [ctx.params.id]) })
    .update({ 'group_id': knex.raw('?', [ctx.request.body.group_id]) }, ['user_id', 'group_id']);

  ctx.status = 200;
  ctx.body = { group_members };
});
module.exports = router.routes();