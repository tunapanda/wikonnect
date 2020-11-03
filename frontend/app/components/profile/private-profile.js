import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfilePrivateProfileComponent extends Component {
  @inject
  me;


  @inject
  store

  @inject
  notify;

  viewOptions = ['Profile', 'Learning', 'Settings'];
  profileView = 'Profile';
  viewOnly = true;
  email = this.me.user.email;

  fname = this.me.user.metadata.firstName;
  lname = this.me.user.metadata.lastName;
  about = this.me.user.metadata.aboutMe;


  @tracked emailModalVisible = false;

  inviteCode = location.protocol + '//' + location.host + '/signup?invite_code=' + this.me.user.inviteCode;

  @computed('me.user.{firstName,lastName}')
  get name() {
    if (this.me.user.firstName && this.me.user.lastName) {
      return `${this.me.user.firstName} ${this.me.user.lastName}`;
    }
    else if (this.me.user.firstName && !this.me.user.lastName) {
      return this.me.user.firstName;
    }
    else if (!this.me.user.firstName && this.me.user.lastName) {
      return this.me.user.lastName;
    }
    else {
      return this.me.user.username;
    }
  }

  @computed('me.user.profileUri')
  get profileUri() {
    return this.me.user.profileUri;
  }


  @action
  onSuccess() {
  }

  @action
  updateEmail() {
    this.notify.info('Updating Email', { closeAfter: 10000 });
    let theEmail = this.email;
    // ...after the record has loaded

    this.store.findRecord('user', this.me.user.id).then(function (user) {
      user.set('email', theEmail);
      user.save();

    });
    this.hideEmailModal();

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
  onError() {
  }

  @computed('model.hasDirtyAttributes')
  get unsavedChanges() {
    return this.model.hasDirtyAttributes;
  }

  @action
  editProfile() {
    this.toggleProperty('viewOnly');
  }


  @action
  saveProfile() {
    this.toggleProperty('viewOnly');
    let first_name = this.fname;
    let last_name = this.lname;
    let about_me = this.about;
    this.store.findRecord('user', this.me.user.id).then(function (user) {
      user.firstName = first_name; // => "Rails is Omakase"
      user.lastName = last_name; // => "Rails is Omakase"

      user.aboutMe = about_me;

      user.save(); // => PATCH to '/posts/1'
      this.notify.info('Profile Updated', { closeAfter: 10000 });
    });

  }
}
