import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class HomeRoute extends Route {

  @inject
  me;

  model() {
    return this.store.findAll('chapter');
  }
}
