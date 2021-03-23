const Router = require('koa-router');

const Review = require('../models/review');
const questions = require('../utils/review-questions');
const {requireAuth} = require('../middleware/permController');


const router = new Router({
  prefix: '/reviews'
});


router.get('/questions', requireAuth, (ctx) => {

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
