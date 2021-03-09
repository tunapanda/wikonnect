const yazl = require('yazl');
const { PackageExporter } = require('@lumieducation/h5p-server');

const log = require('../logger');

class Exporter extends PackageExporter {

  /**
   *
   * @param editor H5PEditor
   */
  constructor(editor) {
    super(editor.libraryManager, editor.contentStorage, editor.config);
  }

  /**
   *
   * @param contentId
   * @param user
   * @returns {Promise<*>}
   */
  async getPackageStream(contentId, user) {
    log.info(`creating package for ${contentId}`);
    await this.checkAccess(contentId, user);

    // create zip files
    const outputZipFile = new yazl.ZipFile();

    // get content data
    const parameters = await this.contentStorage.getParameters(
      contentId,
      user
    );

    const { metadata, metadataStream } = await this.getMetadata(
      contentId,
      user
    );

    // check if filenames are too long and shorten them in the parameters
    // if necessary; the substitutions that took place are returned and
    // later used to change the paths inside the zip archive
    const substitutions = await this.shortenFilenames(
      parameters,
      metadata,
      this.maxContentPathLength
    );

    // add json files
    const contentStream = await this.createContentFileStream(parameters);
    outputZipFile.addReadStream(contentStream, 'content/content.json');
    outputZipFile.addReadStream(metadataStream, 'h5p.json');

    // add content file (= files in content directory)
    await this.addContentFiles(
      contentId,
      user,
      outputZipFile,
      substitutions
    );

    // add library files
    await this.addLibraryFiles(metadata, outputZipFile);

    // signal the end of zip creation
    outputZipFile.end();

    //return the stream
    return outputZipFile.outputStream;

  }
}

module.exports = {
  Exporter: Exporter
};
