const jwToken = require('jsonwebtoken');
const { roles } = require('./_helpers/roles');
// const { defaultPermissionObject } = require('./_helpers/permission');
const { secret } = require('../middleware/jwt');
const log = require('../utils/logger');


/**
 *
 * @param {*} ctx
 * @param {*} next
 */
exports.requireAuth = async function (ctx, next) {
  if (ctx.request.header.authorization === undefined || ctx.request.header.authorization.split(' ')[1] === 'undefined') {
    ctx.state.user = {
      data: {
        user: 'anonymous',
        id: 'anonymous',
        role: 'anonymous'
      }
    };
    log.info('Access granted to Anonymous user');
    await next();
  } else if (ctx.request.header.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    ctx.assert(accessToken,401,{errors:['Access token not found']});
   
    try {
      const {exp, ...data} = jwToken.verify(accessToken, secret);

      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        ctx.throw(401, null, {errors: ['Expired Token']});
      }
      ctx.state.user = data;
      log.info('Access granted to %s user', ctx.state.user.data.username);
    }catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, null, {errors: [e.message]});
      } else {
        ctx.throw(400, null, {errors: [e.message]});
      }
    }
    await next();
  }

};

/**
 *
 * @param {*} action
 * @param {*} resource
 */
exports.grantAccess = function (action, resource) {

  return async (ctx, next) => {
    try {
      let roleName = ctx.state.user.role === undefined ? ctx.state.user.data.role : ctx.state.user.role;

      const permission = roles.can(roleName)[action](resource);

      if (!permission.granted) {
        ctx.throw(400, null, {errors: ['Bad Request']});
      }

      await next();
    } catch (error) {
      log.error(`Bad request with the following message ${error}`);
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  };
};

