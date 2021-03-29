const path = require('path');
const H5P = require('@lumieducation/h5p-server');

/**
 *
 * @type {function(): Promise<H5PConfig>}
 */
exports.H5PConfig = (async () => new H5P.H5PConfig(
  new H5P.fsImplementations.JsonStorage(
    path.resolve(__dirname,'../../config/h5p.json')
  )).load());

exports.H5PUser = (user) => {
  if (!user) {
    return {
      id: '11111',
      name: 'Anonymous User',
      type: 'local',
      canCreateRestricted: false,
      canInstallRecommended: false,
      canUpdateAndInstallLibraries: true
    };
  }
  //TODO expand the user permissions to be dynamic
  return {
    id: user.id || '1000',
    name: user.username || 'Anonymous',
    type: 'local',
    canCreateRestricted: false,
    canInstallRecommended: false,
    canUpdateAndInstallLibraries: true
  };
};
