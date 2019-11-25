import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class SignupRoute extends Route {
  @inject
  me;

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('home');
    }
  }

  model() {
    return this.store.createRecord('user');
  }
}
