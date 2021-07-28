import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileCoursesEnrolledController extends Controller {
  @service store;
  @service me;
  @service intl;
  @service notify;
  @tracked searchTerm;

  get courses() {
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
    let message = this.intl.t('profile.enrolled_courses_page.disenroll_prompt');
    if (window.confirm(message)) {
      try {
        const enrollment = course.courseEnrollments.findBy(
          'userId',
          this.me.id
        );
        if (enrollment) {
          await enrollment.destroyRecord();
        }
      } catch (e) {
        message = this.intl.t('profile.available_courses_page.general_error');
        this.notify.alert(message);
      }
    }
  }
}
