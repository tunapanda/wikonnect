import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CoursesAvailableListComponent extends Component {
  @service store;
  @service me;
  @service intl;
  @service notify;
  @tracked sortBy;

  get courses() {
    return this.args.availableCourses;
  }

  @action
  isEnrolled(course) {
    return (
      this.me.id &&
      course.courseEnrollments &&
      course.courseEnrollments.findBy('userId', this.me.id)
    );
  }

  @action
  async enroll(course) {
    let message = this.intl.t('course.errors.login_to_enroll');
    if (!this.me.id) {
      return this.notify.alert(message);
    }
    message = this.intl.t('course.enroll_successful');
    const enrollment = this.store.createRecord('course-enrollment', {
      userId: this.me.id,
      course: course,
    });
    try {
      await enrollment.save();
      await course.reload();
      this.notify.success(message);
    } catch (e) {
      enrollment.rollbackAttributes();
      message = this.intl.t('course.errors.general_error');
      this.notify.alert(message);
    }
  }

  @action
  async disenroll(course) {
    let message = this.intl.t(
      'profile.available_courses_page.disenroll_prompt'
    );
    if (window.confirm(message)) {
      try {
        const enrollment = course.courseEnrollments.findBy(
          'userId',
          this.me.id
        );
        if (enrollment) {
          await enrollment.destroyRecord();
          await course.reload();
          message = this.intl.t(
            'profile.available_courses_page.disenroll_successful'
          );
          this.notify.success(message);
        }
      } catch (e) {
        message = this.intl.t('profile.available_courses_page.general_error');
        this.notify.alert(message);
      }
    }
  }
}
