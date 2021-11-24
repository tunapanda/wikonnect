
exports.up = function(knex) {
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

exports.down = function(knex) {
  return knex('groups').whereIn('name', [
    'admin',
    'moderator',
    'basic',
  ]).del();
};
