import Component from '@glimmer/component';

export default class ProfilePublicProfileComponent extends Component {

  get name() {
    if (this.args.model.firstName && this.args.model.lastName) {
      return `${this.args.model.firstName} ${this.args.model.lastName}`;
    }
    else if (this.args.model.firstName && !this.args.model.lastName) {
      return this.args.model.firstName;
    }
    else if (!this.args.model.firstName && this.args.model.lastName) {
      return this.args.model.lastName;
    }
    else {
      return this.args.model.username;
    }
  }
}
