import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProfilePublicProfileComponent extends Component {
  @service me;

  get name() {
    return this.me.name;
  }
}
