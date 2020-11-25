/**
 *
 * @param id
 * @param chapterId
 * @param userId
 * @param reaction
 *
 */

const validate = require('validate.js');

async function validateReaction(ctx, next) {

  try {
    await validate.async(ctx.request.body.rating, {
      chapterId: {
        presence: true,
      },
      userId: {
        presence: true,
      },
      reaction: {
        presence: true,
        inclusion: {
          within: ['like', 'dislike', 'null'],
          message: '\'%{value}\' is not allowed in status, try [like, dislike, null]'
        }
      }
    });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e.message });
    } else { ctx.throw(400, null, { errors: e.message }); }
    throw e;
  }
  await next();
}


module.exports = validateReaction;