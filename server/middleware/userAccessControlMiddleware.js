const { roles } = require('./_helpers/roles');

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
      await next();
    } catch (error) {
      await next();
    }
  };
};

exports.allowIfLoggedIn = async (ctx, next) => {
  try {
    const user = ctx.header.user;
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'You need to be logged in to access this route' };
    }
    ctx.header = user;
    await next();
  } catch (error) {
    ctx.throw(401, error);
  }
};
