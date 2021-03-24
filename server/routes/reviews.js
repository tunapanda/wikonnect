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

router.get('/:id', requireAuth, async (ctx) => {
  try {
    const {include} = ctx.query;
    delete ctx.query.include;

    const includeRatings = include ? include.toLowerCase().includes('rating') : false;

    const review = includeRatings ?
      await Review.query()
        .findById(ctx.params.id)
        .withGraphFetched('rating') :
      await Review.query()
        .findById(ctx.params.id);

    ctx.status = 200;
    ctx.body = {review};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }
});

router.get('/', requireAuth, async (ctx) => {
  try {
    const {include} = ctx.query;
    delete ctx.query.include;

    const includeRatings = include ? include.toLowerCase().includes('ratings') : false;

    let reviews = includeRatings ?
      await Review.query()
        .where(ctx.query)
        .withGraphFetched('rating') :
      await Review.query()
        .where(ctx.query);

    ctx.status = 200;
    ctx.body = {reviews};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }
});

router.post('/', requireAuth, async ctx => {

  const obj = ctx.request.body.review;
  const userId = ctx.state.user.data.id;

  //check they don't have existing review
  const existingReview = await Review.query().where({isDeleted: false, userId});
  if (existingReview.length > 0) {
    ctx.throw(400, 'You already have a review');
  }

  try {
    const review = await Review.query()
      .insertAndFetch({...obj, userId});

    ctx.assert(review, 401, 'Something went wrong');

    ctx.status = 201;
    ctx.body = {review};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }

});

router.put('/:id', requireAuth, async ctx => {
  let newReview = ctx.request.body.review;
  const currentReview = await Review.query()
    .where({isDeleted: false, id: ctx.params.id});

  ctx.assert(currentReview, 401, 'Review does not exist');

  try {
    const review = await Review.query()
      .patchAndFetchById(ctx.params.id, newReview);
    ctx.status = 200;
    ctx.body = {review};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  }
});

router.delete('/:id', requireAuth, async ctx => {
  const review = await Review.query()
    .where({isDeleted: false})
    .findById(ctx.params.id);

  if (!review) {
    ctx.throw(401, 'No record with id');
  }
  try {
    await Review.query()
      .findById(ctx.params.id)
      .patch({isDeleted: true});

    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  }
});


module.exports = router.routes();
