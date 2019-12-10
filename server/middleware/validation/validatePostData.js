const validate = require('validate.js');

/**
 *
 * @param { Object } ctx validates post data
 * @param { Object } next continues if valid
 *
 * @example
 * // POST data to course with empty obejcts
 * {
 *    "courses":{
 *    }
 * }
 *
 * // returns an error object
 * {
    "errors": {
        "name": [
            "Name can't be blank"
        ],
        "slug": [
            "Slug can't be blank"
        ],
        "description": [
            "Description can't be blank"
        ],
        "creator_id": [
            "Creator id can't be blank"
        ],
        "status": [
            "Status can't be blank"
        ]
    }
  }
 *
*/
async function validatePostData(ctx, next) {
  const modelName = ctx.request.url.split('/');
  console.log(modelName[3]);

  try {
    await validate.async(ctx.request.body[modelName[3]], {
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
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

module.exports = validatePostData;
