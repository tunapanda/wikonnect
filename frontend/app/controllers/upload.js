import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';
//import { tracked } from '@glimmer/tracking';
import Uploader from '../utils/uploader';




export default class UploadController extends Controller {
  @inject
  me

  @inject
  store;

  queryParams = ['signup'];
  signup = false;

  complete = false;

  @computed('me.user.profileUri')
  get profileImage() {
    return this.me.user.profileUri;
  }

  @action
  async uploadPic(files) {


    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();
    console.log("host");
    console.log(host);

    const uploadRes = await uploader.startUpload([host, 'users', this.me.user.id, 'profile-image'].join('/'));

    this.set("profileImage", "http://localhost:3000/" + uploadRes.path);
    this.set("complete", true);

    if (this.complete === true) {
      this.transitionToRoute('profile');
    }

    //upload
  }
}
