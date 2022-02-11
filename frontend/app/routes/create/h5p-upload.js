import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachH5pUploadRoute extends Route {
  @service me;

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }
}
