import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CourseDraftsRoute extends Route {
  @service me;
  model() {
    return this.store.query('course', {
      status: 'draft',
      creatorId: this.me.id,
    });
  }
}
