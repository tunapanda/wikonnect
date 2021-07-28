exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('group_permissions').del();

  const permissions = [
    {
      id: 'groupAdmin1',
      group_id: 'groupAdmin',
      resource: 'profile',
      action: 'create:any',
      attributes: '*',
    },
    {
      id: 'groupAdmin2',
      group_id: 'groupAdmin',
      resource: 'profile',
      action: 'read:any',
      attributes: '*',
    },
    {
      id: 'groupAdmin3',
      group_id: 'groupAdmin',
      resource: 'profile',
      action: 'update:any',
      attributes: '*',
    },
    {
      id: 'groupAdmin4',
      group_id: 'groupAdmin',
      resource: 'path',
      action: 'delete:own',
      attributes: '*',
    },
    {
      id: 'groupAdmin5',
      group_id: 'groupAdmin',
      resource: 'path',
      action: 'create:any',
      attributes: '*',
    },
    {
      id: 'groupAdmin6',
      group_id: 'groupAdmin',
      resource: 'path',
      action: 'read:any',
      attributes: '*',
    },
    {
      id: 'groupAdmin7',
      group_id: 'groupAdmin',
      resource: 'path',
      action: 'update:any',
      attributes: '*',
    },
  ];
  return knex('group_permissions').insert(permissions);
};
