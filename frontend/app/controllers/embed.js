import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
export default class EmbedController extends Controller {

  queryParams = ['callbackUrl', 'ref']
  @tracked showLoginModal = false;
  @tracked showRegistrationModal = false;
  @inject me

  /** TODO:
   *      Documentation for 3rd party
  */


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

  document = document;

  async sendData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  @action
  async dataLoad() {
    const url = this.callbackUrl;
    // eslint-disable-next-line no-undef
    H5P.externalDispatcher.on('xAPI', function (event) {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(event)
      });
    });
  }
}
