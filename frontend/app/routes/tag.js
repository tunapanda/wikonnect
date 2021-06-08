import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TagRoute extends Route {
  @service me;
  @service config;
  @service infinity;
  @service notify;

  model(params) {
    return this.infinity.model('chapter', {
      approved: true,
      perPage: 10,
      startingPage: 0,
      tags: params.id,
    });
  }
}
