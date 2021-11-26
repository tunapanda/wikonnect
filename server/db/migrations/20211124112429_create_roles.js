
exports.up = async function(knex) {
  await knex.schema.alterTable('group_members', (table) => {
    table.dropPrimary();
    table.dropForeign('group_id');
    table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
  });

  return knex('groups').insert([
    { 
      id: 'groupAdmin', 
      name: 'admin', 
      slug: 'role-admin', 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString()
    },
    { 
      id: 'groupModerator', 
      name: 'moderator', 
      slug: 'role-moderator', 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString()
    },
    { 
      id: 'groupBasic', 
      name: 'basic', 
      slug: 'role-basic', 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    }
  ]);
};

exports.down = async function(knex) {
  await knex.schema.alterTable('group_members', (table) => {
    table.setNullable('group_id');
  });

  await knex('groups').whereIn('name', [
    'admin',
    'moderator',
    'basic',
  ]).del();

  return knex.schema.alterTable('group_members', (table) => {
    table.dropPrimary();
    table.dropColumn('id');
    table.dropNullable('group_id');
    table.primary(['user_id', 'group_id']);
  });
};
