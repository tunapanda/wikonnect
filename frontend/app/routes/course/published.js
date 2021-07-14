import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CoursePublishedRoute extends Route {
  @service me;

  model() {
    return this.store.query('course', {
      status: 'published',
      creatorId: this.me.id,
    });
  }
}
