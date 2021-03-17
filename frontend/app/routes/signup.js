import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SignupRoute extends Route {
  @service me;

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('index');
    }
  }

  model() {
    return this.store.createRecord('user');
  }
}
