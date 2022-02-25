import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachChaptersRoute extends Route {
  @service me;

  model(params) {
    return this.store.query('chapter', {
      creatorId: this.me.user.id,
      status: params.status,
    });
  }
}
