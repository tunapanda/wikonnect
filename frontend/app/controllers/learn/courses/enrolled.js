import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class LearnCoursesEnrolledController extends Controller {
  @service store;
  @service me;
  get enrolledCourses() {
    return this.store
      .peekAll('course')
      .filter(
        (course) =>
          course.id &&
          course.status === 'published' &&
          course.courseEnrollments &&
          course.courseEnrollments.findBy('userId', this.me.id)
      );
  }
}
