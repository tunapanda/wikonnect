import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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
