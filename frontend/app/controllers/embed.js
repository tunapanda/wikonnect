import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EmbedController extends Controller {

  queryParams = ['callbackUrl', 'ref']
  @tracked showLoginModal = false;
  @tracked showRegistrationModal = false;
  @inject
  me



  get embedCode() {
    let mod = this.get('model');
    return `<iframe width="560" height="315" src="app.wikonnect.org/embed/${mod.id}" ></iframe>`;

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
