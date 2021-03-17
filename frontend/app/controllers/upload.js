import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Uploader from '../utils/uploader';

export default class UploadController extends Controller {
  @service me;
  @service store;
  @service notify;

  queryParams = ['signup'];
  signup = false;
  @tracked uploader;
  @tracked userImage;
  @tracked complete = false;

  get profileImage() {
    this.setDefaultUserImage();
    return this.userImage;
  }

  setDefaultUserImage() {
    this.userImage = this.me?.user?.profileUri;
  }

  @action
  async uploadPic(files) {
    try {
      this.uploader = Uploader.create({
        file: files[0],
        filename: files[0].name,
      });

      const host = '/' + this.store.adapterFor('application').urlPrefix();

      const uploadRes = await this.uploader.startUpload(
        [host, 'users', this.me.user.id, 'profile-image'].join('/')
      );

      this.userImage = window.location.origin + uploadRes.path;
      this.complete = true;
      this.transitionToRoute('profile');
    } catch (e) {
      this.notify.alert(
        'Issue encountered while uploading your profile image',
        { closeAfter: 6000 }
      );
    }
  }
}
