
exports.up = knex => {
  return knex.schema
    .table('badge_triggers', table => {
      table.renameColumn('trigger', 'name');
    });
};

exports.down = (knex)=> {
  return knex.schema
    .table('badge_triggers', table => {
      table.renameColumn( 'name','trigger');
    });
};
