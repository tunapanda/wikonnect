import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeRoute extends Route {
  @service me;
  @service config;
  @service headData;
  @service infinity;
  @service notify;

  async afterModel() {
    this.headData.title = 'Wikonnect - Chapters';
    this.headData.theme = '#FF5722';
  }

  model() {
    return this.infinity.model('chapter', {
      approved: true,
      perPage: 10,
      startingPage: 0,
    });
  }
}
