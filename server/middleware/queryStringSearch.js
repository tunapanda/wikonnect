async function queryStringSearch(ctx, next) {

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isEmpty(ctx.query)) {
    const key = 'id';
    const value = ctx.params.id;

    ctx.query = { key, value };
  } else {
    const keys = Object.keys(ctx.query);
    const values = Object.values(ctx.query);

    const key = keys[0];
    const value = values[0];

    ctx.query = { key, value };

  }
  await next();
}

module.exports = queryStringSearch;

