
const validate = require('validate.js');

async function validateChapter(ctx, next) {
  try {
    await validate.async(ctx.request.body.chapter, {
      name: {
        presence: true,
      },
      description: {
        presence: true,
      },
      lessonId: {
        presence: true,
      },
      creatorId: {
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
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validateChapter;
