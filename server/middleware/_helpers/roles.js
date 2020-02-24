const AccessControl = require('accesscontrol');

/**
// const config = require('../../knexfile')['development'];
// const knex = require('knex')(config);

// knex('group_members', 'group_permissions').where({
//   user_id: 'user1'
// }).select('group_id').then(data => console.log(data));

 * grant list fetched from DB (to be converted to a valid grants object, internally)
 * eventually needs to be queried form the database
 */
let grantList = [
  { role: 'basic', resource: 'profile', action: 'create:own', attributes: '*' },
  { role: 'basic', resource: 'profile', action: 'read:own', attributes: '*' },
  { role: 'basic', resource: 'profile', action: 'update:own', attributes: '*' },
  { role: 'basic', resource: 'profile', action: 'delete:own', attributes: '*' },

  { role: 'basic', resource: 'path', action: 'read:own', attributes: '*' },
  { role: 'basic', resource: 'path', action: 'read:any', attributes: '*' },

  { role: 'admin', resource: 'profile', action: 'create:any', attributes: '*' },
  { role: 'admin', resource: 'profile', action: 'read:any', attributes: '*' },
  { role: 'admin', resource: 'profile', action: 'update:any', attributes: '*' },

  { role: 'admin', resource: 'path', action: 'delete:own', attributes: '*' },
  { role: 'admin', resource: 'path', action: 'create:any', attributes: '*' },
  { role: 'admin', resource: 'path', action: 'read:any', attributes: '*' },
  { role: 'admin', resource: 'path', action: 'update:any', attributes: '*' },

  { role: 'superadmin', resource: 'path', action: 'delete:any', attributes: '*' },
  { role: 'superadmin', resource: 'path', action: 'create:any', attributes: '*' },
  { role: 'superadmin', resource: 'path', action: 'read:any', attributes: '*' },
  { role: 'superadmin', resource: 'path', action: 'update:any', attributes: '*' },
];
let ac = new AccessControl(grantList);

exports.roles = (() => {
  ac.grant('basic');

  ac.grant('admin')
    .extend('basic');

  ac.grant('superadmin')
    .extend('basic')
    .extend('admin');
  ac.getGrants();

  return ac;
})();

exports.userPermissions = {
  'read': 'false',
  'update': 'false',
  'create': 'false',
  'delete': 'false'
};
