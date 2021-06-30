import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class CourseShowController extends Controller {
  @service me;

  get playlist() {
    return this.model.get('playlist').sortBy('rank');
  }
  get isMyCourse() {
    return this.me.id === this.model.get('creator').get('id');
  }
}
