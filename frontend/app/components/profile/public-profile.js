import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ProfilePublicProfileComponent extends Component {

  @computed('model.{firstName,lastName}')
  get name() {
    if (this.model.firstName && this.model.lastName) {
      return `${this.model.firstName} ${this.model.lastName}`;
    }
    else if (this.model.firstName && !this.model.lastName) {
      return this.model.firstName;
    }
    else if (!this.model.firstName && this.model.lastName) {
      return this.model.lastName;
    }
    else {
      return this.model.username;
    }
  }
}
