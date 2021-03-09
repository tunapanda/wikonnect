const path = require('path');
const H5P = require('@lumieducation/h5p-server');
const {H5PConfig} = require('./config');
const H5PUrlGenerator= require('./url-generator');

/**
 *
 * @type {{contentFolder: string, librariesFolder: string, temporaryFolder: string}}
 */
const H5PFolders = {
  librariesFolder: path.resolve('public/h5p/libraries'),
  temporaryFolder: path.resolve('public/h5p/temporary-storage'),
  contentFolder: path.resolve('public/h5p/content')
};


/**
 *
 * @returns {Promise<H5PEditor>}
 */
module.exports = async function editor() {

  const config = await H5PConfig();

  const mainH5PEditor = H5P.fs(
    config,
    H5PFolders.librariesFolder,
    H5PFolders.temporaryFolder,
    H5PFolders.contentFolder,
    undefined,
    undefined,
    new H5PUrlGenerator(config)
  );

  return mainH5PEditor.setRenderer((model => model));
};
