const jwToken = require('jsonwebtoken');
const User = require('../models/user');
const { roles } = require('./_helpers/roles');


/**
 *
 * @param {*} ctx
 * @param {*} next
 *
 * @author Moses Okewma <okemwamoses@gmail.com>
 * @example
 * checks for authorization header in the ctx
 * gets user data and expiry date from the token
 * returns an error if the token has expired
 * if (exp < Date.now().valueOf() / 1000) {}
 *
 */
exports.requireAuth = async function (ctx, next) {
  if (ctx.request.header.authorization && ctx.request.header.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    const { exp, data } = jwToken.verify(accessToken, 'secret');

    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      ctx.status = 401;
      ctx.body = {
        error: 'JWT token has expired, please login to obtain a new one'
      };
      return ctx;
    }
    ctx.state.user = User.query().findById(data.id);

    // error handler for when role is not provided
    await next();
  } else {
    await next();
  }
};

/**
 *
 * @param {*} action
 * @param {*} resource
 *
 *
 */
exports.grantAccess = function (action, resource) {
  return async (ctx, next) => {
    try {
      const permission = roles.can(ctx.state.user.role)[action](resource);
      if (!permission.granted) {
        ctx.status = 401;
        ctx.body = {
          error: 'You don\'t have enough permission to perform this action'
        };
        return ctx;
      }

      /**
       * pass the user permissions attributes in the ctx
       * ued to give the user specific access
       */
      if (ctx.params.id && ctx.params.id === ctx.state.user.data.id) {
        ctx.state.user.attributes = permission.attributes;
      } else {
        ctx.state.user.attributes = 'none';
      }

      await next();
    } catch (error) {
      // await next();
      ctx.status = 401;
      ctx.body = error;
    }
  };
};
