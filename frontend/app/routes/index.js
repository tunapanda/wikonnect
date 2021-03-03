import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service me;
  @service headData;

  async afterModel() {
    this.headData.title = 'Wikonnect - Home';
    this.headData.theme = '#534897';
  }
}
