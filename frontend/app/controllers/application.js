import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {

  @inject
  session;

  @inject
  me;

  @action
  logout() {
    this.me.logout();
    document.location.reload();
    this.transitionToRoute('home');
  }



}
