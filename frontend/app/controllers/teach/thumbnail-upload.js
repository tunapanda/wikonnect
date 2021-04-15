import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Uploader from '../../utils/uploader';
import { tracked } from '@glimmer/tracking';

export default class TeachH5pUploadController extends Controller {
  @service me;
  @service notify;

  @tracked hover = false;
  @tracked uploader;
  @tracked thumbnail;

  get selectedImagePreviewSrc() {
    if (this.thumbnail) {
      return URL.createObjectURL(this.thumbnail);
    }
    if (this.model.imageUrl) {
      return this.model.imageUrl;
    }
    return '';
  }

  @action
  async onFilesSelect(files) {
    if (files.length > 1) {
      this.notify.error('You can only upload one file');
    } else {
      this.thumbnail = files[0];
    }
  }

  @action
  async saveThumbnail() {
    if (!this.thumbnail && this.model.imageUrl) {
      this.transitionToRoute('teach.tag', this.model.id);
      return;
    }
    if (!this.thumbnail || !this.thumbnail?.name) {
      this.notify.error('You have not selected any thumbnail image');

      return;
    }

    let id = this.model.id;
    this.uploader = Uploader.create({
      file: this.thumbnail,
      filename: this.thumbnail.name,
    });

    const host = '/' + this.store.adapterFor('application').urlPrefix();
    try {
      await this.uploader.startUpload(
        [host, 'chapters', id, 'chapter-image'].join('/')
      );
      //reset the thumbnail local property
      this.thumbnail = null;
      this.transitionToRoute('teach.tag', id);
    } catch (e) {
      this.notify.alert('Unexpected err encountered during thumbnail upload');
    }
  }
}
