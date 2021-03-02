import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TeachThumbnailUploadRoute extends Route {

  @inject me;

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }

}
