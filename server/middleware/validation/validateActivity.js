
const validate = require('validate.js');

async function validateActivity(ctx, next) {
  try {
    await validate.async(ctx.request.body, {
      user_id: {
        presence: true,
      },
      chapter_id: {
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
