import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WifiRedirectModalComponent extends Component {
  @tracked show = true;
  @tracked redirectUrl = '';

  @action
  showModal() {
    this.show = true;
  }

  @action
  hideModal() {
    this.show = false;
  }
}
