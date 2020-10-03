import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';
import Uploader from '../../utils/uploader';

export default class TeachH5pUploadController extends Controller {
  @inject me;

  complete = false;



  @action
  async uploadPic(files) {

    let id = this.get("chapter_id");
    console.log(id)
    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();


    const uploadRes = await uploader.startUpload([host, 'chapters', id, 'chapter-image'].join('/'));

    //upload
    this.set("complete", true);

    if (this.complete === true) {
      this.transitionToRoute('teach.preview', id);
    }

  }
}
