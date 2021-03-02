import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Uploader from '../../utils/uploader';
import { tracked } from '@glimmer/tracking';

export default class TeachH5pUploadController extends Controller {
  @service me;
  @service notify;

  @tracked uploader;
  @tracked complete = false;


  @action
  async uploadPic(files) {

    try {
      let id = this.model.id;
      this.uploader = Uploader.create({
        file: files[0],
        filename: files[0].name,
      });


      const host = '/' + this.store.adapterFor('application').urlPrefix();


      await this.uploader.startUpload([host, 'chapters', id, 'upload'].join('/'));

      this.complete = true;
      this.transitionToRoute('teach.preview', id);
    } catch (e) {
      this.notify.alert('We have encountered unexpected error when uploading the H5P content');
    }
  }
}
