import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {

  @service me;
  @service session;

  @tracked loggedIn;

  get myProfile() {
    this.loggedIn = this.me.user;
    return this.me.a;
  }


}
