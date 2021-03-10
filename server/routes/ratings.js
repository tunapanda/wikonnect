const Router = require('koa-router');
const log = require('../utils/logger');
const Rating = require('../models/rating');
const { requireAuth, grantAccess } = require('../middleware/permController');
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
 *     HTTP/1.1 201 OK
 *     {
 *      "rating": [{
 *         "id": String,
 *         "rating": String,
 *         "comment": String,
 *         "chapter_id": String,
 *         "user_id": String,
 *         "labels": Array,
 *         "category": String,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime
 *        }]
 *      }
 *
 */

router.get('/:id', requireAuth, grantAccess('readOwn', 'path'), async ctx => {

  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let ratingId = ctx.params.id != 'current' ? ctx.params.id : stateUserId;
  const rating = await Rating.query().findById(ratingId);


  if (rating.userId != stateUserId || stateUserId === 'anonymous') {
    log.info('Error logging  %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(401, 'You do not have permissions to view that user');
  }

  ctx.assert(rating, 404, 'no lesson by that ID');
  log.error('The user path accessed does not exist');

  ctx.status = 200;
  ctx.body = { rating };
});

/**
 * @api {get} / GET ratings
 * @apiName GetChapterRatings
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "ratings": [{
 *         "id": String,
 *         "rating": String,
 *         "comment": String,
 *         "chapter_id": String,
 *         "user_id": String,
 *         "labels": Array,
 *         "category": String,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime
 *        }]
 *      }
 *
 */

router.get('/', async ctx => {

  let ratings;
  try {
    ratings = await Rating.query().where(ctx.query);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
  ctx.assert(ratings, 401, 'Something went wrong');


  ctx.status = 200;
  ctx.body = { ratings };

});

/**
 * @api {post} / POST rating
 * @apiName PostAChapterRating
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "ratings": {
 *         "id": String,
 *         "rating": String,
 *         "comment": String,
 *         "chapter_id": String,
 *         "user_id": String,
 *         "labels": Array,
 *         "category": String,
 *         "createdAt": DateTime,
 *         "updatedAt": DateTime
 *        }
 *      }
 * @apiSampleRequest off
 *
 */


router.post('/', requireAuth, validateRating, grantAccess('createAny', 'path'), async ctx => {

  let newFLag = ctx.request.body.rating;
  const maxPoints = 5;

  if (newFLag.rating > maxPoints) {
    ctx.throw(400, 'Rating cannot be greater than 5');
  }

  try {
    const rating = await Rating.query().insertAndFetch(newFLag);

    ctx.assert(rating, 401, 'Something went wrong');
    ctx.status = 201;
    ctx.body = { rating };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
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

router.put('/:id', requireAuth, grantAccess('updateOwn', 'path'), async ctx => {
  let newRating = ctx.request.body.rating;
  const checkRating = await Rating.query().findById(ctx.params.id);

  if (!checkRating) {
    log.info('Error, path does not exists  %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(400, 'That lesson path does not exist');
  }

  const lesson = await Rating.query().patchAndFetchById(ctx.params.id, newRating);

  ctx.status = 201;
  ctx.body = { lesson };

});
/**
 * @api {delete} /:rating_id DELETE a rating
 * @apiName DeleteAChapterRating
 * @apiGroup ChapterRatings
 * @apiPermission authenticated user
 * @apiSampleRequest off
 *
 */
router.delete('/:id', grantAccess('deleteOwn', 'path'), async ctx => {
  const rating = await Rating.query().findById(ctx.params.id);

  if (!rating) {
    ctx.throw(401, 'No record with id');
  }
  await Rating.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { rating };
});

module.exports = router.routes();
