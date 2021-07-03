import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CourseShowRoute extends Route {
  @service me;

  model({ id }) {
    return Promise.all([
      this.store.findRecord('course', id, {
        include: 'enrollment',
        enrolledUserId: this.me.id,
      }),
      this.store.query('course', { limit: 5, type: 'popular' }),
      this.store.query('tag', { limit: 5, type: 'popular' }),
    ]);
  }
}
