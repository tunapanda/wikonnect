import Component from '@ember/component';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import Uploader from '../utils/uploader';

export default class EditChapterComponent extends Component {
  @inject
  store;

  @action
  async fileAdded(chapter, files) {
    console.log(arguments);

    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);


    const host = '/' + this.store.adapterFor('application').urlPrefix();

    const uploadRes = await uploader.startUpload([host, 'chapters', chapter.id, 'upload'].join('/'));

    // const url = ['//', uploadRes.host, uploadRes.path].join('/');

    chapter.set('contentType', 'h5p');
    chapter.set('contentUri', '/' + uploadRes.path);

    return chapter.save();
  }

  @action
  opennav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

}
