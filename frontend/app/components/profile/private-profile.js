import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';

export default class ProfilePrivateProfileComponent extends Component {
  @inject
  me;

  viewOptions = ['Profile', 'Learning', 'Settings'];
  profileView = 'Profile';
  viewOnly = true;

  inviteCode = location.protocol + '//' + location.host + '/signup?invite_code=' + this.me.user.username;

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

  // @computed('me.user.{firstName,lastName}')
  // @get achievements(){

  // }

  @action
  onSuccess() {
    console.log("copied");
  }


  @action
  onError() {
    console.log("no copy");
  }

  @computed('model.hasDirtyAttributes')
  get unsavedChanges() {
    return this.model.hasDirtyAttributes;
  }

  @action
  editProfile() {
    this.toggleProperty('viewOnly');
  }
}
