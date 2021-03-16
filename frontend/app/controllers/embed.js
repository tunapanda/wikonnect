import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EmbedController extends Controller {
  @service me;

  queryParams = ['callbackUrl', 'ref'];
  @tracked showLoginModal = false;
  @tracked showRegistrationModal = false;

  get embedCode() {
    return `<iframe width="560" height="315" src="app.wikonnect.org/embed/${this.model.id}" ></iframe>`;
  }

  @action
  openLoginModal(status) {
    this.showLoginModal = status;
  }

  @action
  openSignUpModal(status) {
    this.showRegistrationModal = status;
  }

  @action
  login() {
    this.showLoginModal = false;
  }

  @action
  signup() {
    this.showRegistrationModal = false;
  }

  @action
  logout() {
    this.me.logout();
  }
}
