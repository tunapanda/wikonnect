import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfilePrivateProfileComponent extends Component {
  @service me;
  @service store;
  @service notify;

  @tracked email = this.me.user.email;
  @tracked emailModalVisible = false;
  @tracked viewOnly = true;

  viewOptions = ['Profile', 'Learning', 'Settings'];

  fname = this.me.user?.metadata?.firstName;
  lname = this.me.user?.metadata?.lastName;
  about = this.me.user?.metadata?.aboutMe;

  inviteCode =
    location.protocol +
    '//' +
    location.host +
    '/signup?invite_code=' +
    this.me.user.inviteCode;

  get name() {
    return this.me.name;
  }

  get profileUri() {
    return this.me.user.profileUri;
  }

  @action
  onSuccess() {}

  @action
  onError() {}

  @action
  updateEmail() {
    this.notify.info('Updating Email', { closeAfter: 10000 });

    this.store
      .findRecord('user', this.me.user.id)
      .then((user) => {
        user.email = this.email;
        user.save();
      })
      .then(() => {
        this.hideEmailModal();
      });
  }

  @action
  showEmailModal() {
    this.emailModalVisible = true;
  }

  @action
  hideEmailModal() {
    this.emailModalVisible = false;
  }

  @action
  editProfile() {
    this.viewOnly = !this.viewOnly;
  }

  @action
  async saveProfile() {
    try {
      this.viewOnly = !this.viewOnly;

      let user = this.store.peekRecord('user', this.me.user.id);
      user.firstName = this.fname;
      user.lastName = this.lname;
      user.aboutMe = this.about;
      await user.save();
      this.notify.info('Profile Updated', { closeAfter: 10000 });
    } catch (err) {
      if (err && err.errors) {
        this.notify.error('Mind your language', { closeAfter: 10000 });
      }
    }
  }
}
