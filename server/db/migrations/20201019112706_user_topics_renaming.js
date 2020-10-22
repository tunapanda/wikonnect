
exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.renameColumn('topics', 'tags');
    });

};

exports.down = knex => {
  return knex.schema
    .table('users', table => {
      table.renameColumn('tags', 'topics');
    });
};
