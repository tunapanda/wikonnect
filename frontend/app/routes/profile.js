import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class ProfileRoute extends Route {

  @inject
  me;

  model(params) {
    return this.store.findByUsername(params.username)
  }

}
