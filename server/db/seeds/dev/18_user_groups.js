exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('groups').del();

  const groups = [
    {
      id: 'groupAdmin',
      name: 'admin',
      slug: 'role-admin',
      description: '',
      created_at: '2019-12-20 19:17:10',
      updated_at: '2019-12-20 19:17:10',
    },
    {
      id: 'groupModerator',
      name: 'moderator',
      slug: 'role-moderator',
      description: '',
      created_at: '2019-12-20 19:17:10',
      updated_at: '2019-12-20 19:17:10',
    },
    {
      id: 'groupVerified',
      name: 'verified',
      slug: 'role-verified',
      description: '',
      created_at: '2019-12-20 19:17:10',
      updated_at: '2019-12-20 19:17:10',
    },
  ];


  return knex('groups').insert(groups);
};
