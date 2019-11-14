async function queryStringSearch(ctx, next) {

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isEmpty(ctx.query)) {
    delete ctx.query.description;
    delete ctx.query.created_at;
    delete ctx.query.updated_at;
    delete ctx.query.metadata;
    delete ctx.query.name;
    delete ctx.query.creator_id;

    ctx.query = { 'id': ctx.params.id };

  }
  await next();
}

module.exports = queryStringSearch;
