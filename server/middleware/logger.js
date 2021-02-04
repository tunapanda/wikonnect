/**
 * global logger for dev mode
 */
module.exports = async function (ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`Time: ${new Date(start).toGMTString()} ==> ${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms ${ctx.status}`);
};