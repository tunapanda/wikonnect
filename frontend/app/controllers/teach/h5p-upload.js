import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import Uploader from '../../utils/uploader';

export default class TeachH5pUploadController extends Controller {
  @inject me;

  complete = false;

  @action
  addFiles(files) {
    this.hover = false;
    if (files.length > 1) {
      this.notify.warning('You can only upload one file', { closeAfter: 1000 });

    }

    console.log(files)
  }

  @action
  async uploadPic(files) {

    let id = this.get('model').id;
    console.log(id);
    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();


    await uploader.startUpload([host, 'chapters', id, 'upload'].join('/'));

    //upload
    this.set('complete', true);

    if (this.complete === true) {
      this.transitionToRoute('teach.preview', id);
    }

  }
}
