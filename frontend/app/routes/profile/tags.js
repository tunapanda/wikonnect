import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileTagsRoute extends Route {
  @service infinity;
  @service me;

  model() {
    return this.store.query('tag', {
      include: 'tagsfollowers',
      includeAggregates: true,
      followerId: this.me.id,
    });
  }
}
