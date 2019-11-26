const AccessControl = require('accesscontrol');

const ac = new AccessControl();

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
  return ac;
})();
