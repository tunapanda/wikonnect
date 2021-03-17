import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachPublishedRoute extends Route {
  @service me;

  async model() {
    return this.store.query('chapter', {
      creatorId: this.me.user.id,
      status: 'published',
    });
  }
}
