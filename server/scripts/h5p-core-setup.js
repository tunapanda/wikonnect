const https = require('https');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const versions = {
  core: '1.24.0',
  editor: '1.24.1'
};

const tempFolder = 'public/h5p';

const coreLibUrl = `https://codeload.github.com/h5p/h5p-php-library/zip/${versions.core}`;
const coreLibFolderPath = path.resolve('public/h5p/core');

const editorLibUrl = `https://codeload.github.com/h5p/h5p-editor-php-library/zip/${versions.editor}`;
const coreEditorFolderLibPath = path.resolve('public/h5p/editor');

if (!fs.existsSync(coreLibFolderPath)) {

  /**
   * Download the core H5P PHP library
   */
  https.get(coreLibUrl, {}, (res) => {
    if (res.statusCode !== 200) {
      throw 'Failed to download H5P core library assets';
    }

    res.pipe(unzipper.Extract({path: tempFolder}))
      .on('close', () => {
        fs.renameSync(`${tempFolder}/h5p-php-library-${versions.core}`, coreLibFolderPath);
      });
  });
}

if (!fs.existsSync(coreEditorFolderLibPath)) {
  /**
   * Download the H5P editor PHP generic library
   */
  https.get(editorLibUrl, {}, (res) => {
    if (res.statusCode !== 200) {
      throw 'Failed to download H5P core library assets';
    }
    res.pipe(unzipper.Extract({path: tempFolder}))
      .on('close', () => {
        fs.renameSync(`${tempFolder}/h5p-editor-php-library-${versions.editor}`, coreEditorFolderLibPath);
      });
  });
}

