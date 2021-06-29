import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class CourseRoute extends Route {
  @service me;

  model() {
    return this.store.find('user', this.me.id);
  }
}
