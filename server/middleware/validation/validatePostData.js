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
async function validateCourses(ctx, next) {

  try {
    await validate.async(ctx.request.body.course, {
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
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
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e });
    } else { ctx.throw(400, null, { errors: e }); }
    throw e;
  }
  await next();
}


async function validatePaths(ctx, next) {

  try {
    await validate.async(ctx.request.body.learningPath, {
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
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
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e });
    } else { ctx.throw(400, null, { errors: e }); }
    throw e;
  }
  await next();
}

async function validateLessons(ctx, next) {

  try {
    await validate.async(ctx.request.body.lesson, {
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
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
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e });
    } else { ctx.throw(400, null, { errors: e }); }
    throw e;
  }
  await next();
}

async function validateModules(ctx, next) {

  try {
    await validate.async(ctx.request.body.module, {
      name: {
        presence: true,
      },
      slug: {
        presence: true,
      },
      description: {
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
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: e });
    } else { ctx.throw(400, null, { errors: e}); }
    throw e;
  }
  await next();
}


module.exports = {
  validateCourses,
  validatePaths,
  validateLessons,
  validateModules
};
