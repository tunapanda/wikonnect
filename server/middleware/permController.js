const jwToken = require('jsonwebtoken');
const { roles } = require('./_helpers/roles');
// const { defaultPermissionObject } = require('./_helpers/permission');
const { secret } = require('../middleware/jwt');


exports.requireAuth = async function (ctx, next) {
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
};


exports.grantAccess = function (action, resource) {

  return async (ctx, next) => {
    let roleName = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;

    const permission = roles.can(roleName)[action](resource);
    if (!permission.granted) {
      ctx.throw(400, null, { errors: ['Bad Request'] });
      return ctx;
    }

    await next();
  };
};

