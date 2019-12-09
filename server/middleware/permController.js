const jwToken = require('jsonwebtoken');
const User = require('../models/user');
const { roles } = require('./_helpers/roles');
const { defaultPermissionObject } = require('./_helpers/permission');


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
      console.log(ctx.state.user.role);

      const permission = roles.can(ctx.state.user.role)[action](resource);
      if (!permission.granted) {
        ctx.status = 401;
        ctx.body = {
          error: 'You don\'t have enough permission to perform this action'
        };
        return ctx;
      }

      let permissionData = JSON.parse(JSON.stringify(defaultPermissionObject));
      const permissions = roles.getGrants();

      Object.keys(permissions[ctx.state.user.role])
        .forEach(resource => {

          Object.keys(permissions[ctx.state.user.role][resource])
            .forEach(permission => {
              if (permissions[ctx.state.user.role][resource][permission].length > 0) {
                const permissionInfo = permission.split(':');
                permissionData[resource][permissionInfo[0]] = permissionInfo[1];
              }
            });
        });

      ctx.state.user.attributes = permissionData[resource];

      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = error;
    }
  };
};

