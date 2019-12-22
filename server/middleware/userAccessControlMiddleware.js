const { roles } = require('./_helpers/roles');



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
