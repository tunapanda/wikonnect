import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class LoginRoute extends Route {
    @inject
    me;

    model() {
      return this.store.createRecord('user');
    }

}
