import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import Uploader from '../../utils/uploader';
import {tracked} from '@glimmer/tracking';


export default class TeachH5pUploadController extends Controller {
  @service me;
  @service notify;

  @tracked complete = false;
  @tracked hover = false;
  @tracked uploader;


  @action
  addFiles(files) {
    this.hover = false;
    if (files.length > 1) {
      this.notify.warning('You can only upload one file', {closeAfter: 1000});
    }

  }

  @action
  onFileHover() {
    this.hover = true;
  }

  @action
  onFileExit() {
    this.hover = false;
  }


  @action
  async uploadPic(files) {

    let id = this.model.id;
    this.uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    const host = '/' + this.store.adapterFor('application').urlPrefix();
    try {
      await this.uploader.startUpload([host, 'chapters', id, 'chapter-image'].join('/'));

      this.complete = true;
      this.transitionToRoute('teach.tag', id);
    } catch (e) {
      this.notify.alert('Unexpected err encountered during thumbnail upload');
    }
  }
}
