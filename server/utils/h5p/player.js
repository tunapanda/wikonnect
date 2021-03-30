const {H5PPlayer} = require('@lumieducation/h5p-server');
const {H5PConfig} = require('./config');
const H5PUrlGenerator = require('./url-generator');


exports.H5PPlayer = async (editor) => {
  const config = await H5PConfig();

  const player = await new H5PPlayer(
    editor.libraryStorage,
    editor.contentStorage,
    config,
    null,
    new H5PUrlGenerator(config),
    {
      customization: {
        global: {
          styles: ['/h5p/h5p-player.css']
        }
      }}
  );
  return player.setRenderer((model => model));
};
