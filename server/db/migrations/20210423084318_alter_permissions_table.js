
exports.up = function (knex) {
  return knex.schema
    .alterTable('group_members', (table) => {
      table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('SET DEFAULT')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable('group_members', (table) => {
      table.dropForeign('group_id');
    });

};
