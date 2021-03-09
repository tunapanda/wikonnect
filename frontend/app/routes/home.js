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

  @action
  loading(transition) {
    let start = new Date();
    transition.promise.finally(() => {
      this.notify.info(`Took ${new Date() - start}ms to load`, {
        radius: true,
      });
    });
    return true;
  }

  model() {
    return this.infinity.model('chapter', { approved: true });
  }
}
