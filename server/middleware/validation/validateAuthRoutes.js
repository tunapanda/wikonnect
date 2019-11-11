const validate = require('validate.js');

async function validateNewUser(ctx, next) {
  try {
    await validate.async(ctx.request.body.user, {
      email: function (value, attributes) {
        if (attributes.phonenumber) {
          return {
            email: true
          };
        }
        return {
          presence: true,
          email: true
        };
      },
      phonenumber: function (value, attributes) {
        if (attributes.email) {
          return {
            numericality: true
          };
        }
        return {
          presence: true,
          numericality: true
        };
      },
      username: {
        presence: true,
        format: '[a-zA-Z0-9_-]*'
      },
      password: {
        presence: true,
        length: {
          minimum: 8,
          maximum: 50
        }
      }
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

async function validateUserLogin(ctx, next) {
  try {
    await validate.async(ctx.request.body, {
      username: {
        presence: true,
        format: '[a-zA-Z0-9_-]*'
      },
      password: {
        presence: true,
        length: {
          minimum: 8,
          maximum: 50
        }
      }
    });
  } catch (error) {
    return ctx.throw(400, { error });
  }
  await next();
}
module.exports = {
  validateNewUser,
  validateUserLogin
};
