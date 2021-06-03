
exports.up = knex => {
  return knex.schema
    .table('badges', table => {
      table.renameColumn('trigger', 'trigger_id');
    });
};

exports.down = (knex)=> {
  return knex.schema
    .table('badges', table => {
      table.renameColumn( 'trigger_id','trigger');
    });
};
