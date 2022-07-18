import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WifiRedirectModalComponent extends Component {
  @tracked show = true;
  @tracked isRedirecting = false;

  @action
  showModal() {
    this.show = true;
  }

  @action
  hideModal() {
    this.show = false;
  }

  @action
  redirect() {
    this.isRedirecting = true;
    window.location.href = this.args.redirectUrl;
    this.hideModal();
  }
}
