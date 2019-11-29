const AccessControl = require('accesscontrol');


/**
 * grant list fetched from DB (to be converted to a valid grants object, internally)
 * eventually needs to be queried form the database
 */
let grantList = [
  { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
  { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
  { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
  { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },

  { role: 'basic', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
  { role: 'basic', resource: 'video', action: 'read:any', attributes: '*' },
  { role: 'basic', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
  { role: 'basic', resource: 'video', action: 'delete:own', attributes: '*' }
];
const ac = new AccessControl(grantList);


exports.roles = (() => {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
    .readOwn('path')
    .updateOwn('path');

  ac.grant('admin')
    .extend('basic')
    .readAny('profile')
    .createAny('profile')
    .readAny('path')
    .createAny('path');

  ac.grant('superadmin')
    .extend('basic')
    .extend('admin')
    .updateAny('profile')
    .deleteAny('profile')
    .updateAny('path')
    .deleteAny('path');
  ac.getGrants();
  // console.log(ac.getGrants());
  return ac;
})();
