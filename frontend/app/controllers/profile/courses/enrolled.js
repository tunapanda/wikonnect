import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileCoursesEnrolledController extends Controller {
  @service store;
  @service me;
  @service intl;
  @service router;
  @tracked searchTerm;

  get courses() {
    return this.store
      .peekAll('course')
      .filter(
        (course) =>
          course.id &&
          course.courseEnrollments &&
          course.courseEnrollments.findBy('userId', this.me.id)
      );
  }

  get enrolledCourses() {
    if (this.searchTerm) {
      return this.courses.filter((course) => {
        return (
          course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      });
    }
    return this.courses;
  }

  @action
  async disenroll(course) {
    if (
      window.confirm(
        this.intl.t('profile.enrolled_courses_page.disenroll_prompt')
      )
    ) {
      const enrollment = course.courseEnrollments.findBy('userId', this.me.id);
      if (enrollment) {
        await enrollment.destroyRecord();
      }
    }
  }
}
