import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ProfileRoute extends Route {

  @inject
  me;

  model(params) {
    return this.store.findByUsername(params.username);
  }

}
