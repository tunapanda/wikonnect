
const validate = require('validate.js');

async function validateAchievement(ctx, next) {
  try {
    await validate.async(ctx.request.body.achievement.statement, {
      'actor.mbox': { presence: true },
      'verb.id': { presence: true },
      'verb.display': { presence: true },
      'object.id': { presence: true },
      'object.definition.name': { presence: true },
      'object.description': { presence: true }
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validateAchievement;
