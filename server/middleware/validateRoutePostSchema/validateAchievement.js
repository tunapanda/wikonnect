
const validate = require('validate.js');

async function validateAchievement(ctx, next) {
  try {
    await validate.async(ctx.request.body.achievement, {
      'user_id': { presence: true },
      'target_status': { presence: true },
      'target': { presence: true },
      'description': { presence: true },
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validateAchievement;
