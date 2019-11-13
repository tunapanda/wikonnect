async function queryStringSearch(ctx, next) {

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isEmpty(ctx.query)) {
    const key = 'id';
    const value = ctx.params.id;
    const sort = 'status';

    ctx.query = { key, value, sort };
  } else {
    const keys = Object.keys(ctx.query);
    const values = Object.values(ctx.query);

    const key = keys[0];
    const value = values[0];
    const sort = values[1] ? values[1] : 'status';

    ctx.query = { key, value, sort };

  }
  await next();
}

module.exports = queryStringSearch;
