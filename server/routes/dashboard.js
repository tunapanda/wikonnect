const Router = require('koa-router');
const Dashboard = require('../models/questionnaire');
const permController = require('../middleware/permController');

const router = new Router({
  prefix: '/dashboard'
});


/**
 * @api {get} /dashboard GET all M&E data.
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


router.get('/', permController.requireAuth, async ctx => {
  try {
    const board = await Dashboard.query();

    ctx.status = 200;
    ctx.body = { board };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'No data found' });
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

module.exports = router.routes();