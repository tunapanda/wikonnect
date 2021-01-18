/**
 * global logger for dev mode
 */
module.exports = async function (ctx, next) {
  const start = Date.now();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms ${ctx.status}`);
  await next();
};