import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {


  @inject
  me;

  @inject
  session;

  @tracked loggedIn;

  @computed()
  get myProfile() {
    this.loggedIn = this.me.user;
    return this.me.a;
  }
}
