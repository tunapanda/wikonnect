/**
 *
 * @param id
 * @param chapterId
 * @param userId
 * @param rating
 *
 */

const validate = require('validate.js');

async function validateRating(ctx, next) {

  try {
    await validate.async(ctx.request.body.rating, {
      chapterId: {
        presence: true,
      },
      userId: {
        presence: true,
      },
      rating: {
        presence: true,
      }
    });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e });
    } else { ctx.throw(400, null, { errors: e }); }
    throw e;
  }
  await next();
}


module.exports = validateRating;