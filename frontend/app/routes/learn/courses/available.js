import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LearnCoursesAvailableRoute extends Route {
  @service me;

  model() {
    let query = { status: 'published' };
    if (this.me.id) {
      query = { ...query, include: 'enrollment', enrolledUserId: this.me.id };
    }
    return this.store.query('course', query);
  }
}
