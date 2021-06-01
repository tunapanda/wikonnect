
exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.text('location');
      table.text('contact_number');
      table.text('gender');
    });
};

exports.down = (knex) => {
  return knex.schema
    .table('users', table => {
      table.dropColumn('location');
      table.dropColumn('contact_number');
      table.dropColumn('gender');
    });
};
