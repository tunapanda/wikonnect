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
  // try {
  if (ctx.request.header.authorization === undefined || ctx.request.header.authorization.split(' ')[1] === 'undefined') {
    const data = {
      data: {
        user: 'anonymous',
        id: 'anonymous',
        role: 'anonymous'
      }
    };
    ctx.state.user = data;
    log.info('Access granted to Anonymous user');
    await next();
  } else if (ctx.request.header.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = ctx.request.header.authorization.split(' ')[1];
    const { exp, ...data } = jwToken.verify(accessToken, secret);

    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      ctx.throw(400, null, { errors: ['Expired Token'] });
    }
    ctx.state.user = data;
    log.info('Access granted to %s user', ctx.state.user.data.username);
    await next();
  }
  // } catch (error) {
  //   log.error(`The following error ${error} with message ${error.message}`);
  //   // const envs = ['test', 'development'];
  //   // if (envs.includes(process.env.NODE_ENV)) {
  //   //   ctx.throw(error.statusCode, null, { errors: error });
  //   // }
  //   ctx.throw(400, null, { errors: ['Bad Request'] });
  // }
};

/**
 *
 * @param {*} action
 * @param {*} resource
 */
exports.grantAccess = function (action, resource) {

  return async (ctx, next) => {
    try {
      let roleName = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;

      const permission = roles.can(roleName)[action](resource);

      if (!permission.granted) {
        ctx.throw(400, null, { errors: ['Bad Request'] });
      }

      await next();
    } catch (error) {
      log.error(`Bad request with the following message ${error}`);
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  };
};

