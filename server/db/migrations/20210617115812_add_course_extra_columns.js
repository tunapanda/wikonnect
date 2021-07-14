exports.up = knex => {
  return knex.schema
    .table('courses', table => {
      table.text('thumbnail_url');
    });
};

exports.down = (knex) => {
  return knex.schema
    .table('courses', table => {
      table.dropColumn('thumbnail_url');
    });
};
