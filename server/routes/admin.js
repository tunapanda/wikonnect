const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);


const router = new Router({
  prefix: '/admin'
});

router.get('/', requireAuth, async ctx => {
  let group_members;
  try {
    group_members = await knex().from('group_members').join('groups', { 'group_members.group_id': 'groups.id' });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 200;
  ctx.body = { group_members };
});

router.get('/user', requireAuth, async ctx => {
  let group_members;
  try {
    group_members = await knex('group_members')
      .where('user_id', knex.raw('?', [ctx.state.user.data.id]))
      .join('groups', { 'group_members.group_id': 'groups.id' });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 200;
  ctx.body = { group_members };
});

router.post('/', requireAuth, grantAccess('updateAny', 'path'), async ctx => {
  let group_members;
  try {
    group_members = await knex()
      .insert(
        [{ 'user_id': knex.raw('?', [ctx.query.user_id]), 'group_id': knex.raw('?', [ctx.query.group_id]) }],
        ['user_id', 'group_id'])
      .into('group_members');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = { group_members };
});


router.put('/', requireAuth, async ctx => {
  let group_members;
  try {
    group_members = await knex('group_members')
      .where({ 'user_id': knex.raw('?', [ctx.query.user_id]) })
      .update({ 'group_id': knex.raw('?', [ctx.query.group_id]) }, ['user_id', 'group_id']);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = { group_members };
});
module.exports = router.routes();