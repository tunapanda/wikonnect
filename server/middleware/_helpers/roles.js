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
  { role: 'anonymous', resource: 'path', action: 'read:own', attributes: '*' },
  { role: 'verified', resource: 'profile', action: 'create:own', attributes: '*' },
  { role: 'verified', resource: 'profile', action: 'read:own', attributes: '*' },
  { role: 'verified', resource: 'profile', action: 'update:own', attributes: '*' },
  { role: 'verified', resource: 'profile', action: 'delete:own', attributes: '*' },

  { role: 'verified', resource: 'path', action: 'read:own', attributes: '*' },
  { role: 'verified', resource: 'path', action: 'read:any', attributes: '*' },
  { role: 'verified', resource: 'path', action: 'create:any', attributes: '*' },

  { role: 'moderator', resource: 'private', action: 'delete:own', attributes: '*' },
  { role: 'moderator', resource: 'private', action: 'create:any', attributes: '*' },
  { role: 'moderator', resource: 'private', action: 'read:any', attributes: '*' },
  { role: 'moderator', resource: 'private', action: 'update:any', attributes: '*' },

  { role: 'admin', resource: 'private', action: 'delete:any', attributes: '*' },
  { role: 'admin', resource: 'private', action: 'create:any', attributes: '*' },
  { role: 'admin', resource: 'private', action: 'read:any', attributes: '*' },
  { role: 'admin', resource: 'private', action: 'update:any', attributes: '*' },
];
let ac = new AccessControl(grantList);

exports.roles = (() => {
  ac.grant('verified');

  ac.grant('moderator')
    .extend('verified');

  ac.grant('admin')
    .extend('verified')
    .extend('moderator');

  ac.getGrants();

  return ac;
})();

exports.userPermissions = {
  'read': 'false',
  'update': 'false',
  'create': 'false',
  'delete': 'false'
};
