
const validate = require('validate.js');

async function validateAchievement(ctx, next) {
  try {
    await validate.async(ctx.request.body, {
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
        presence: true,
      },
      activity_id: {
        presence: true,
      }
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validateAchievement;
