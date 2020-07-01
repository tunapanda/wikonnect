const Router = require('koa-router');
const Questionnaire = require('../models/questionnaire');
const { requireAuth } = require('../middleware/permController');

const knex = require('../utils/knexUtil');

const router = new Router({
  prefix: '/dashboard'
});


/**
 * @api {get} /dashboard/mande GET all M&E data.
 * @apiName GetM&E
 * @apiGroup Dashboard
 * @apiPermission superadmin
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *        "message": "No data found"
 *     }]
 */


router.get('/mande', requireAuth, async ctx => {
  try {
    const postQ = await Questionnaire.query();

    ctx.status = 200;
    ctx.body = { postQ };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});

/**
 * @api {get} /dashboard/searches GET result search query.
 * @apiName GetSearches
 * @apiGroup Dashboard
 * @apiPermission teacher
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *        "message": "No data found"
 *     }]
 */


// router.get('/teach', permController.requireAuth, async ctx => {
//   try {
//     const data = CourseSearch.query();
//     ctx.status = 200;
//     ctx.body = { data };
//   } catch (e) {
//     if (e.statusCode) {
//       ctx.throw(e.statusCode, { message: ['No data found'] });
//     } else { ctx.throw(400, null, { errors: [e.message] }); }
//     throw e;
//   }
// });




/**
   * return the count of completed chapter
   * @param {object[]} dataRange
   * @return {Integer}
   */

router.get('/achievement/:startDate/:endDate', requireAuth, async ctx => {

  // const from = '2017-12-20';
  // const to = '2018-12-20';
  const from = ctx.params.startDate;
  const to = ctx.params.endDate;

  let achievement;
  try {
    achievement = await knex('achievements')
      .select()
      .where({ target_status: 'completed' })
      .whereBetween('created_at', [from, to]);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }

  ctx.status = 200;
  ctx.body = { achievement: achievement.length };
});

module.exports = router.routes();
