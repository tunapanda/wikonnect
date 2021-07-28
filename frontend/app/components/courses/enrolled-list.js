import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CoursesEnrolledListComponent extends Component {
  @service me;
  @service intl;
  @service notify;
  @tracked searchTerm;

  get courses() {
    return this.args.enrolledCourses;
  }

  @action
  async disenroll(course) {
    let message = this.intl.t('course.prompts.disenroll');
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
        message = this.intl.t('course.errors.general_error');
        this.notify.alert(message);
      }
    }
  }
}
