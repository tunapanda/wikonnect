import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachTagRoute extends Route {
  @service me;

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }

  afterModel() {
    return this.store.findAll('tag');
  }
}
