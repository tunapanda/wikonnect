async function queryStringSearch(ctx, next) {

  delete ctx.query.description;
  delete ctx.query.created_at;
  delete ctx.query.updated_at;
  delete ctx.query.metadata;

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isEmpty(ctx.query)) {

    ctx.query = { 'id': ctx.params.id };

  }
  await next();
}

module.exports = queryStringSearch;
