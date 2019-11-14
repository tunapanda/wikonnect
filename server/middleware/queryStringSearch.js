async function queryStringSearch(ctx, next) {

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isEmpty(ctx.query)) {
    ctx.query = { 'id': ctx.params.id };

  } 
  await next();
}

module.exports = queryStringSearch;
