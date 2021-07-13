const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

// Extracted from https://github.com/tunapanda/h5p-standalone/blob/master/cypress/plugins/index.js#L27
exports.seedH5PFiles  = async (contentId) => {
  const h5pFilePath = path.resolve(__dirname,'files/chart.h5p'); //the h5p file
  const tempFolder = path.resolve(__dirname,'temp-extract'); //where to extract to temporarily
  const destFolder = path.resolve('public/h5p'); //destination folder
  const librariesFolder = 'libraries/';
  const contentFolder = contentId? `${contentId}/`:'chapter1/';

  const H5PLibraries = ['H5P.Chart-1.2']; // from H5P.json

  await fs.createReadStream(`${h5pFilePath}`)
    .pipe(unzipper.Extract({path: `${tempFolder}`}))
    .promise();
  //copy libraries
  H5PLibraries.map((folder) => {
    recursiveCopy(`${tempFolder}/${folder}/`, `${destFolder}/${librariesFolder}${folder}`);
  });

  //copy content
  recursiveCopy(`${tempFolder}/content/`, `${destFolder}/content/${contentFolder}`);

  //copy h5p.json
  fs.copyFileSync(`${tempFolder}/h5p.json`, `${destFolder}/content/${contentFolder}h5p.json`);

    
  //cleanup the temp folder
  fs.rmdirSync(`${tempFolder}`, {recursive: true});


};

function recursiveCopy(src, dest) {
  const exists = fs.existsSync(src);
  if (!exists) {
    return;
  }
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, {recursive: true});
    }
    fs.readdirSync(src).forEach((item) => {
      recursiveCopy(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
