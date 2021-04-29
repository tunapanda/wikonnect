import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
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

  @action
  async onH5PPlayerXAPIEvent(event) {
    if (this.callbackUrl) {
      fetch(this.callbackUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(event),
      });
    }
  }
}
