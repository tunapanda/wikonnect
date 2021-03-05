import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service me;
  @service config;
  @service headData;

  async afterModel() {
    this.headData.title = 'Wikonnect - Chapters';
    this.headData.theme = '#FF5722';
  }

  model() {
    return this.store.query('chapter', { approved: true });
  }
}
