const {H5PPlayer} = require('@lumieducation/h5p-server');
const {H5PConfig} = require('./config');
const H5PUrlGenerator = require('./url-generator');


exports.H5PPlayer = async (editor) => {
  const config = await H5PConfig();

  const player = await new H5PPlayer(
    editor.libraryStorage,
    editor.contentStorage,
    config,
    new H5PUrlGenerator(config)
  );
  return player.setRenderer((model => model));
};
