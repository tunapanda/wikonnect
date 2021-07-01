import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CourseShowRoute extends Route {
  @service me;

  model({ id }) {
    return this.store.findRecord('course', id, {
      include: 'enrollment',
      enrolledUserId: this.me.id,
    });
  }
}
