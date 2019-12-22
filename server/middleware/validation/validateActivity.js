
const validate = require('validate.js');

async function validateActivity(ctx, next) {
  try {
    await validate.async(ctx.request.body.activity, {
      userId: {
        presence: true,
      },
      chapterId: {
        presence: true,
      },
      progress: {
        presence: true,
      },
      status: {
        presence: true,
      }
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validateActivity;
