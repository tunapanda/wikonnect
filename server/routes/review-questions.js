const Router = require('koa-router');

const questions = require('../utils/review-questions');


const router = new Router({
  prefix: '/review-questions'
});



/**
 * @api {get} /api/v1/review-questions GET review questions
 * @apiName Get review questions
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Query Params) {string} [categories] categories to filter (comma separated)
 *
 * @apiSuccess {Object[]} reviewQuestions Top level array of question objects
 * @apiSuccess {String} reviewQuestions[category] category unique identifier
 * @apiSuccess {String} reviewQuestions[title] category title
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "reviewQuestions": [
 *            {
 *                "category": "audioVideoQuality",
 *                "title": "Audio & video quality"
 *            },
 *            {
 *                "category": "soundQuality",
 *                "title": "Sound quality"
 *            }
 *
 *          ]
 *      }
 *
 *
 */

router.get('/', (ctx) => {

  const {categories} = ctx.query;
  if (!categories) {
    ctx.status = 200;
    ctx.body = {reviewQuestions: questions};
  } else {

    const filteredQuestions = [];
    const parsedCategories = categories.split(',');

    parsedCategories.map((category) => {
      const obj = questions.find((question) => question.category === category.trim());
      ctx.assert(obj, 401, 'Content type questions not found');
      filteredQuestions.push(obj);
    });


    ctx.status = 200;
    ctx.body = {reviewQuestions: filteredQuestions};
  }

});


module.exports = router.routes();