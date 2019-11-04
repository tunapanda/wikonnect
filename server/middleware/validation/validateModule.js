const validate = require('validate.js');

async function validateModule(ctx, next){
  try {
    await validate.async(ctx.request.body,{
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
        presence: true,
      },
      creator_id: {
        presence: true,
      },
      status: {
        presence: true,
        inclusion: {
          within: ['published', 'draft', 'archived'],
          message: '\'%{value}\' is not allowed in status, try [published, draft, archived]'
        }
      }
    });
  } catch (error) {
    return ctx.throw(400, { error });
  }
  await next();
}

module.exports = validateModule;
