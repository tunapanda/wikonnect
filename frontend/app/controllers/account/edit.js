import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Uploader from '../../utils/uploader';
import accountValidation from '../../validations/edit-account';

export default class AccountEditController extends Controller {
  @service notify;

  @tracked selectedProfilePic;
  @tracked fileUploader;

  accountValidation = accountValidation;

  get genderOptions() {
    return ['Male', 'Female', 'I prefer not to say'];
  }

  get userProfilePicSrc() {
    if (this.selectedProfilePic) {
      return URL.createObjectURL(this.selectedProfilePic);
    }

    if (this.model.profileUri) {
      return this.model.profileUri;
    }
    return '';
  }

  @action
  uploadProfilePic(files) {
    if (files.length > 1) {
      this.notify.error('You can only upload one file');
      return;
    }
    if (files[0].size > 15 * 1024 * 1024) {
      this.notify.error('Photo size should be less 15MB');
      return;
    }
    this.selectedProfilePic = files[0];
  }

  @action
  async updateProfile(userModel) {
    if (!userModel.isDirty && this.selectedProfilePicUploaded !== false) {
      return;
    }
    if (this.selectedProfilePic) {
      this.fileUploader = Uploader.create({
        file: this.selectedProfilePic,
        filename: this.selectedProfilePic.name,
      });
      try {
        await this.fileUploader.startUpload(
          [
            this.store.adapterFor('application').host,
            this.store.adapterFor('application').urlPrefix(),
            'users',
            this.model.id,
            'profile-image',
          ].join('/')
        );
        this.selectedProfilePic = null;
      } catch (e) {
        this.notify.alert(
          'Issue encountered while uploading your profile image',
          { closeAfter: 100000 }
        );
        throw 'Issue with profile image upload process';
      }
    }

    if (!userModel.isDirty) {
      this.notify.success('Profile image updated successfully', {
        closeAfter: 10000,
      });
      userModel.reload(); //no option because model will still have dirty attributes on store.push
    }
    try {
      await userModel.save();
      this.notify.success('Profile details updated successfully', {
        closeAfter: 10000,
      });
    } catch (e) {
      this.notify.alert(
        'Issue encountered while updating your profile. Kindly try again later',
        { closeAfter: 100000 }
      );
    }
  }
}
