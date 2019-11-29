exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      return knex('groups').insert([
        {
          id: 'group1',
          name: 'admin',
          slug: 'role-admin',
          description: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }, {
          id: 'group2',
          name: 'superadmin',
          slug: 'role-superadmin',
          description: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }, {
          id: 'group3',
          name: 'basic',
          slug: 'role-basic',
          description: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
      ]);
    });
};
