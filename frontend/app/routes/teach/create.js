import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TeachCreateRoute extends Route {
  @inject
  me;



  model() {
    return this.store.createRecord('chapter', {
      creator: this.me.get('user')
    });
  }
}