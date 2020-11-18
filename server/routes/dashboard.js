const Router = require('koa-router');
const { requireAuth } = require('../middleware/permController');
const moment = require('moment');
const getQuarter = require('date-fns/getQuarter');
const knex = require('../utils/knexUtil');
// const compareAsc = require('date-fns/compareAsc');
// const startOfQuarter = require('date-fns/startOfQuarter');
// const User = require('../models/user');

const router = new Router({
  prefix: '/dashboard'
});

/**
 *
 * @param {*} ctx
 * @param {*} next
 */
async function dateQuery(ctx, next) {
  const queryQ = ctx.params.quarter.toLowerCase();
  const queryY = ctx.params.year;
  const stringQ = {
    'q1': 1,
    'q2': 2,
    'q3': 3,
    'q4': 4
  };

  const from = moment().year(queryY).quarter(stringQ[queryQ]);
  let to = moment(from).endOf('quarter');
  if (to > moment()) {
    to = moment();
  }
  ctx.state.dateQuery = { from, to };
  await next();
}

router.get('/achievements/:quarter/:year', requireAuth, dateQuery, async ctx => {
  const from = ctx.state.dateQuery.from;
  const to = ctx.state.dateQuery.to;

  let achievement;
  try {
    achievement = await knex('achievements')
      .select()
      .where({ target_status: 'completed' })
      .whereBetween('created_at', [from, to]);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
    throw e;
  }

  ctx.status = 200;
  ctx.body = { achievement: achievement.length, starDate: from, endDate: to };
});

router.get('/completed', requireAuth, async ctx => {
  const from = moment().year(2020).quarter(2);
  const start = getQuarter(new Date(from));

  let completed;
  try {
    /* eslint-disable quotes */
    completed = await knex.raw("select (extract(year from created_at) || '.Q' || extract(quarter from created_at)) as quarter, count(*) from achievements group by extract(year from created_at), extract(quarter from created_at) having count(target_status) > 1");
  } catch (e) {
    ctx.throw(406, null, { errors: [e.message] });
    throw e;
  }

  const data = {
    completed: completed.rows,
    quarter: start
  };

  ctx.body = { data };
});


router.get('/learners', requireAuth, async ctx => {
  let total, quarterly;
  try {
    total = await knex('users').count('*');
    quarterly = await knex.raw("select count(users.id), (extract(year from achievements.created_at) || '.Q' || extract(quarter from achievements.created_at)) as quarter from users left join achievements on achievements.user_id = users.id group by extract(year from achievements.created_at), extract(quarter from achievements.created_at) having count(achievements.target_status) > 1")
  } catch (e) {
    ctx.throw(406, null, { errors: [e.message] });
    throw e;
  }

  const learners = {
    total: total[0],
    quarterly: quarterly.rows,
  };
  ctx.body = learners;

});
module.exports = router.routes();
