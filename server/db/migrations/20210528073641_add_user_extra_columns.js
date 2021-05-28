
exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.text('location');
      table.text('contactNumber');
      table.text('gender');
    });
};

exports.down = (knex) => {
  return knex.schema
    .table('users', table => {
      table.dropColumn('location');
      table.dropColumn('contactNumber');
      table.dropColumn('gender');
    });
};
