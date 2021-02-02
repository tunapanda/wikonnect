const Router = require('koa-router');
const { requireAuth, grantAccess } = require('../middleware/permController');
const knex = require('../utils/knexUtil');
// const compareAsc = require('date-fns/compareAsc');
// const startOfQuarter = require('date-fns/startOfQuarter');
// const User = require('../models/user');
const fallback = 0;

const router = new Router({
  prefix: '/dashboard'
});

router.get('/completed', requireAuth, grantAccess('readAny', 'path'), async ctx => {

  let completed, total;
  try {
    /* eslint-disable quotes */
    total = await knex.raw("select count(*) from chapters inner join achievements on chapters.id = target and target_status = 'completed'");
    completed = await knex.raw("select (extract(year from chapters.created_at) || '.Q' || extract(quarter from chapters.created_at)) as quarter, count(*) from chapters inner join achievements on chapters.id = target and target_status = 'completed' group by extract(year from chapters.created_at), extract(quarter from chapters.created_at)");
  } catch (e) {
    ctx.throw(406, null, { errors: [e.message] });
    throw e;
  }

  const data = {
    total: total.rows[0].count || fallback,
    completed: completed.rows || fallback
  };

  ctx.body = data;
});


router.get('/learners', requireAuth, grantAccess('readAny', 'path'), async ctx => {
  let total, quarterly;
  try {
    total = await knex('users').count('*');
    quarterly = await knex.raw("select count(users.id), (extract(year from achievements.created_at) || '.Q' || extract(quarter from achievements.created_at)) as quarter from users left join achievements on achievements.user_id = users.id group by extract(year from achievements.created_at), extract(quarter from achievements.created_at) having count(achievements.target_status) > 1");
  } catch (e) {
    ctx.throw(406, null, { errors: [e.message] });
    throw e;
  }

  const learners = {
    total: total[0].count || fallback,
    quarterly: quarterly.rows || fallback,
  };
  ctx.body = learners;
});


router.get('/creators', requireAuth, grantAccess('readAny', 'path'), async ctx => {
  let total, with_10_chapters, created_by_users;
  try {
    total = await knex.raw('select count(distinct creator_id) from chapters');
    with_10_chapters = await knex.raw("select count(creator_id) from chapters group by creator_id having count(creator_id) > 9");
    created_by_users = await knex.raw("select count(users.id) from users inner join chapters on users.id = chapters.creator_id");

  } catch (e) {
    ctx.throw(406, null, { errors: [e.message] });
    throw e;
  }

  const creators = {
    total: total.rows[0].count || fallback,
    with_10_chapters: with_10_chapters.rows[0] || fallback,
    created_by_users: created_by_users.rows[0].count || fallback
  };
  ctx.body = creators;

});
module.exports = router.routes();
