import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Uploader from '../../utils/uploader';
import { tracked } from '@glimmer/tracking';

export default class TeachH5pUploadController extends Controller {
  @service me;
  @service notify;

  @tracked uploader;

  @tracked H5PZipFile;

  @action
  onH5PZipFileSelection(files) {
    if (files.length > 1) {
      this.notify.error('You can only upload one H5P file');
      return;
    }
    this.H5PZipFile = files[0];
  }
  @action
  async uploadH5PFile() {
    const id = this.model.id;

    if (!this.H5PZipFile && this.model.contentUri) {
      this.transitionToRoute('teach.thumbnail-upload', id);
      return;
    }
    if (!this.H5PZipFile) {
      this.notify.error('You have not selected any H5P zip file');
      return;
    }
    try {
      this.uploader = Uploader.create({
        file: this.H5PZipFile,
        filename: this.H5PZipFile,
      });

      const host = '/' + this.store.adapterFor('application').urlPrefix();

      await this.uploader.startUpload(
        [host, 'chapters', id, 'upload'].join('/')
      );

      this.transitionToRoute('teach.thumbnail-upload', id);
    } catch (e) {
      this.notify.alert(
        'We have encountered unexpected error when uploading the H5P content'
      );
    }
  }
}
