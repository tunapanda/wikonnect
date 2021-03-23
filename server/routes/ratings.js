const Router = require('koa-router');
const log = require('../utils/logger');
const Rating = require('../models/rating');
const {requireAuth} = require('../middleware/permController');
const validateRating = require('../middleware/validateRoutePostSchema/validateRating');

const router = new Router({
  prefix: '/ratings'
});

/**
 * @api {get} /:rating_id GET a rating
 * @apiName GetAChapterRating
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      rating:{
 *         "id": String,
 *         "chapterId": String,
 *         "userId": String,
 *         "metadata":Object,
 *         "reviewId": null,
 *         "averageRating": String,
 *         "reaction": String,
 *         "isDeleted": boolean,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime,
 *        }
 *    }
 *
 */

router.get('/:id', requireAuth, async ctx => {

  const stateUserId = ctx.state.user.id === undefined ? ctx.state.user.data.id : ctx.state.user.id;

  const {include} = ctx.query;

  const includeReview = include ? include.toLowerCase().includes('review') : false;

  try {
    const rating = includeReview ?
      await Rating.query()
        .findById(ctx.params.id)
        .withGraphFetched('review') :
      await Rating.query()
        .findById(ctx.params.id);

    if (rating.userId !== stateUserId || stateUserId === 'anonymous') {
      log.info('Error logging  %s for %s', ctx.request.ip, ctx.path);
      ctx.throw(403, 'You do not have permissions to view that user');
    }

    ctx.status = 200;
    ctx.body = {rating};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }
});

/**
 * @api {get} / GET ratings
 * @apiName GetChapterRatings
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      ratings:[{
 *         "id": String,
 *         "chapterId": String,
 *         "userId": String,
 *         "metadata":Object,
 *         "reviewId": null,
 *         "averageRating": String,
 *         "reaction": String,
 *         "isDeleted": boolean,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime,
 *        }]
 *    }
 *
 */

router.get('/', requireAuth, async ctx => {

  const {include} = ctx.query;
  delete ctx.query.include;

  const includeReview = include ? include.toLowerCase().includes('review') : false;

  try {
    const ratings = includeReview ?
      await Rating.query()
        .where(ctx.query)
        .withGraphFetched('review') :
      await Rating.query()
        .where(ctx.query);

    ctx.status = 200;
    ctx.body = {ratings};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }


});

/**
 * @api {post} / POST ratings
 * @apiName Post Chapter Rating
 * @apiGroup Chapter Ratings & Review
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *    {
 *      rating:{
 *         "id": String,
 *         "chapterId": String,
 *         "userId": String,
 *         "metadata":Object,
 *         "reviewId": null,
 *         "averageRating": String,
 *         "reaction": String,
 *         "isDeleted": boolean,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime,
 *        }
 *    }
 *
 * @apiSampleRequest on
 *
 */


router.post('/', requireAuth, validateRating, async ctx => {

  const obj = ctx.request.body.rating;
  const userId = ctx.state.user.data.id;

  //check they don't have existing rating
  const selectedRatings = await Rating.query().where({isDeleted: false, userId});
  if (selectedRatings.length > 0) {
    ctx.throw(400, 'You have already rated the chapter');
  }


  const ratings = Object.values(obj.metadata);
  const totalRating = ratings.reduce((acc, val) => {
    if (val > 5) {
      ctx.throw(400, 'Rating cannot be greater than 5');
    }
    acc += +val;
    return acc;
  }, 0);

  const averageRating = totalRating / ratings.length;


  try {
    const rating = await Rating.query()
      .insertAndFetch({...obj, userId, averageRating});

    ctx.assert(rating, 401, 'Something went wrong');

    ctx.status = 201;
    ctx.body = {rating};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }
});


/**
 * @api {put} /:rating_id PUT comment
 * @apiName PutAChapterRating
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 * @apiSampleRequest off
 *
 */

router.put('/:id', requireAuth, async ctx => {
  const userId = ctx.state.user.data.id;

  //check if the rating exist
  const currentRating = await Rating.query()
    .where({isDeleted: false, id: ctx.params.id, userId});

  ctx.assert(currentRating, 401, 'Rating does not exist');

  let obj = ctx.request.body.rating;

  if (obj.metadata) {
    const ratings = Object.values(obj.metadata);
    const totalRating = ratings.reduce((acc, val) => {
      if (val > 5) {
        ctx.throw(400, 'Rating cannot be greater than 5');
      }
      acc += +val;
      return acc;
    }, 0);

    const averageRating = totalRating / ratings.length;

    obj = {...obj, averageRating};
  }

  try {
    const rating = await Rating.query()
      .patchAndFetchById(ctx.params.id, obj);

    ctx.status = 200;
    ctx.body = {rating};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  }

});
/**
 * @api {delete} /:rating_id DELETE a rating
 * @apiName DeleteAChapterRating
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 * @apiSampleRequest off
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const rating = await Rating.query()
    .where({isDeleted: false})
    .findById(ctx.params.id);

  if (!rating) {
    ctx.throw(401, 'No record with id');
  }
  await Rating.query()
    .findById(ctx.params.id)
    .patch({isDeleted: true});

  ctx.status = 200;
  ctx.body = {};
});

module.exports = router.routes();
