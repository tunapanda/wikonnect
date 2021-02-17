import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import Uploader from '../../utils/uploader';

export default class TeachH5pUploadController extends Controller {
  @inject me;

  complete = false;



  @action
  async uploadH5p(files) {

    let id = this.get('model').id;
    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();

    try {
      await uploader.startUpload([host, 'chapters', id, 'upload'].join('/'));
    } catch(err) {
      console.log(err);
    }

    //upload
    this.set('complete', true);

    if (this.complete === true) {
      this.transitionToRoute('teach.thumbnail-upload', id);
    }

  }
}
