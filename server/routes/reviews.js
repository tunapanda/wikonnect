const Router = require('koa-router');

const Review = require('../models/review');
const {requireAuth} = require('../middleware/permController');


const router = new Router({
  prefix: '/reviews'
});

/**
 * @api {get} /api/v1/reviews/:id GET chapter review by Id
 * @apiName Get review by Id
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id review id
 *
 * @apiParam (Query Params) {Boolean} [isDeleted] filter by deleted status
 * @apiParam (Query Params) {String} [include] relationships to eager load (comma separated)
 *
 * @apiSuccess {Object} review Top level object
 * @apiSuccess {String} review[id] review id
 * @apiSuccess {String} review[chapterId] associated chapter Id
 * @apiSuccess {String} review[ratingId] associated rating Id
 * @apiSuccess {Object} review[metadata] rating metadata
 * @apiSuccess {String} review[userId] rating owner
 * @apiSuccess {Boolean} review[isDeleted]  if record was deleted
 * @apiSuccess {String} review[createdAt] date created
 * @apiSuccess {String} review[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "review":{
 *           "id": "IzLEIXSAASc",
 *           "chapterId": "IzMs75WAAA0",
 *           "reaction": "like",
 *           "ratingId": "IzLDvwGAASY",
 *           "metadata":{"language": "Great", "audioQuality": "Good", "contentAccuracy":["Citations provided","Good"]},,
 *           "userId": "user1",
 *           "isDeleted": false,
 *           "createdAt": "2021-03-24T11:51:33.520Z",
 *           "updatedAt": "2021-03-24T11:51:33.520Z"
 *         }
 *      }
 *
 *
 */
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

/**
 * @api {get} /api/v1/reviews GET all chapter reviews
 * @apiName Get all reviews
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Query Params) {Boolean} isDeleted filter by deleted status (optional)
 * @apiParam (Query Params) {String} include relationships to eager load (comma separated & optional)
 *
 * @apiSuccess {Object[]} review Top level object
 * @apiSuccess {String} review[id] review id
 * @apiSuccess {String} review[chapterId] associated chapter Id
 * @apiSuccess {String} review[ratingId] associated rating Id
 * @apiSuccess {Object} review[metadata] rating metadata
 * @apiSuccess {String} review[userId] rating owner
 * @apiSuccess {Boolean} review[isDeleted]  if record was deleted
 * @apiSuccess {String} review[createdAt] date created
 * @apiSuccess {String} review[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "review":[{
 *           "id": "IzLEIXSAASc",
 *           "chapterId": "IzMs75WAAA0",
 *           "reaction": "like",
 *           "ratingId": "IzLDvwGAASY",
 *           "metadata":{"language": "Great", "audioQuality": "Good", "contentAccuracy":["Citations provided","Good"]},,
 *           "userId": "user1",
 *           "isDeleted": false,
 *           "createdAt": "2021-03-24T11:51:33.520Z",
 *           "updatedAt": "2021-03-24T11:51:33.520Z"
 *         }]
 *      }
 *
 *
 */
router.get('/', requireAuth, async (ctx) => {
  try {
    const {include} = ctx.query;
    delete ctx.query.include;

    const includeRatings = include ? include.toLowerCase().includes('rating') : false;

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

/**
 * @api {post} /api/v1/review POST a chapter review
 * @apiName Post a review
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Request Body) {Object} review[metadata] rating metadata
 * @apiParam (Request Body) {String} review[chapterId] chapter being rated
 * @apiParam (Request Body) {String} review[reaction] chapter reaction
 * @apiParam (Request Body) {String} review[ratingId] related chapter rating Id
 *
 * @apiSuccess {Object} review Top level object
 * @apiSuccess {String} review[id] review id
 * @apiSuccess {String} review[chapterId] associated chapter Id
 * @apiSuccess {String} review[ratingId] associated rating Id
 * @apiSuccess {Object} review[metadata] rating metadata
 * @apiSuccess {String} review[userId] rating owner
 * @apiSuccess {Boolean} review[isDeleted]  if record was deleted
 * @apiSuccess {String} review[createdAt] date created
 * @apiSuccess {String} review[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "review":{
 *           "id": "IzLEIXSAASc",
 *           "chapterId": "IzMs75WAAA0",
 *           "reaction": "like",
 *           "ratingId": "IzLDvwGAASY",
 *           "metadata":{"language": "Great", "audioQuality": "Good", "contentAccuracy":["Citations provided","Good"]},,
 *           "userId": "user1",
 *           "isDeleted": false,
 *           "createdAt": "2021-03-24T11:51:33.520Z",
 *           "updatedAt": "2021-03-24T11:51:33.520Z"
 *         }
 *      }
 *
 *
 */
router.post('/', requireAuth, async ctx => {

  const obj = ctx.request.body.review;
  const userId = ctx.state.user.data.id;

  //check they don't have existing review
  const existingReview = await Review.query().where({isDeleted: false, userId,chapterId: obj.chapterId});
  if (existingReview.length > 0) {
    ctx.throw(400, 'You already have a review');
  }

  try {
    const review = await Review.query()
      .insertAndFetch({...obj, userId});

    ctx.assert(review, 404, 'Something went wrong');

    ctx.status = 201;
    ctx.body = {review};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }

});

/**
 * @api {put} /api/v1/review PUT a chapter review
 * @apiName PUT a chapter review by Id
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id review id to update
 *
 * @apiParam (Request Body) {Object} [review[metadata]] rating metadata
 * @apiParam (Request Body) {String} [review[chapterId]] chapter being rated
 * @apiParam (Request Body) {String} [review[reaction]] chapter reaction
 * @apiParam (Request Body) {String} [review[ratingId]] related chapter rating Id
 *
 * @apiSuccess {Object} review Top level object
 * @apiSuccess {String} review[id] review id
 * @apiSuccess {String} review[chapterId] associated chapter Id
 * @apiSuccess {String} review[ratingId] associated rating Id
 * @apiSuccess {Object} review[metadata] rating metadata
 * @apiSuccess {String} review[userId] rating owner
 * @apiSuccess {Boolean} review[isDeleted]  if record was deleted
 * @apiSuccess {String} review[createdAt] date created
 * @apiSuccess {String} review[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "review":{
 *           "id": "IzLEIXSAASc",
 *           "chapterId": "IzMs75WAAA0",
 *           "reaction": "like",
 *           "ratingId": "IzLDvwGAASY",
 *           "metadata":{"language": "Great", "audioQuality": "Good", "contentAccuracy":["Citations provided","Good"]},,
 *           "userId": "user1",
 *           "isDeleted": false,
 *           "createdAt": "2021-03-24T11:51:33.520Z",
 *           "updatedAt": "2021-03-24T11:51:33.520Z"
 *         }
 *      }
 *
 *
 */
router.put('/:id', requireAuth, async ctx => {
  let newReview = ctx.request.body.review;
  const currentReview = await Review.query()
    .where({isDeleted: false, id: ctx.params.id});

  ctx.assert(currentReview, 404, 'Review does not exist');

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

/**
 * @api {delete} /api/v1/review/:id Delete a chapter review
 * @apiName DELETE a chapter review by Id
 * @apiGroup Ratings and Review
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the review to delete
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const review = await Review.query()
    .where({isDeleted: false})
    .findById(ctx.params.id);

  if (!review) {
    ctx.throw(404, 'No record with id');
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
