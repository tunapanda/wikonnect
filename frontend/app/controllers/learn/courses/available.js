import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class LearnCoursesAvailableController extends Controller {
  @service store;

  get availableCourses() {
    return this.store
      .peekAll('course')
      .filter((course) => course.id && course.status === 'published');
  }
}
