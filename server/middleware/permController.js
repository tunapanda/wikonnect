const jwToken = require('jsonwebtoken');
const { roles } = require('./_helpers/roles');
// const { defaultPermissionObject } = require('./_helpers/permission');
const { secret } = require('../middleware/jwt');


/**
 *
 * @param {*} ctx
 * @param {*} next
 *
 * @author Moses Okemwa <okemwamoses@gmail.com>
 * @example
 * checks for authorization header in the ctx
 * gets user data and expiry date from the token
 * returns an error if the token has expired
 * if (exp < Date.now().valueOf() / 1000) {}
 *
 */
exports.requireAuth = async function (ctx, next) {
  try {
    if (ctx.request.header.authorization === undefined || ctx.request.header.authorization.split(' ')[1] === 'undefined') {
      const data = {
        data: {
          user: 'anonymous',
          id: 'anonymous',
          role: 'anonymous'
        }
      };
      ctx.state.user = data;
      await next();
    } else if (ctx.request.header.authorization.split(' ')[0] === 'Bearer') {
      const accessToken = ctx.request.header.authorization.split(' ')[1];
      const { exp, ...data } = jwToken.verify(accessToken, secret);

      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        ctx.throw(400, null, { errors: ['Expired Token'] });
        return ctx;
      }
      ctx.state.user = data;
      await next();
    }

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
};


/**
 * @param  { actionType } action
 * action type: readOwn || createOwn || deleteOwn || updateOwn
 * @param  { resource } resource
 * routes that the role has the permission to access
 * @returns { boolean }
 * if false (throws an error) if true (passes to the next function)
 * @example
 * grantAccess('readAny', 'path')
 *
 * // returns an error if the role does not have enough permission to perform action on the route
 * !permission.granted == True
 *
 * // moves to next function if the role has enough permissions to perform action on the route
 * !permission.granted == false
 */

exports.grantAccess = function (action, resource) {

  return async (ctx, next) => {
    try {
      let roleName = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;

      const permission = roles.can(roleName)[action](resource);
      if (!permission.granted) {
        ctx.throw(400, null, { errors: ['Bad Request'] });
        return ctx;
      }

      await next();
    } catch (e) {
      if (e.statusCode) {
        // ctx.throw(e.statusCode, { message: 'Bad Request Using Token' });
        ctx.throw(e.statusCode, null, { errors: [e.message] });
      } else {
        ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
      throw e;
    }
  };
};

