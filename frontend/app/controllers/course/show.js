import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CourseShowController extends Controller {
  @service me;
  @service notify;
  @service intl;

  get playlist() {
    return this.model.get('playlist').sortBy('rank');
  }
  get isMyCourse() {
    return this.me.id === this.model.get('creator').get('id');
  }

  get isEnrolled() {
    return (
      this.model.courseEnrollments &&
      this.model.courseEnrollments.findBy('userId', this.me.id)
    );
  }

  @action
  async enroll() {
    let message = this.intl.t('course.show_page.enrolled_successfully');
    const enrollment = this.store.createRecord('course-enrollment', {
      userId: this.me.id,
      course: this.model,
    });
    try {
      await enrollment.save();
      await this.model.reload();
      this.notify.success(message);
    } catch (e) {
      enrollment.rollbackAttributes();
      message = this.intl.t('course.show_page.general_error');
      this.notify.alert(message);
    }
  }

  @action
  async disenroll() {
    let message = this.intl.t('course.show_page.disenroll_prompt');
    if (window.confirm(message)) {
      try {
        const enrollment = this.model.courseEnrollments.findBy(
          'userId',
          this.me.id
        );
        if (enrollment) {
          await enrollment.destroyRecord();
          await this.model.reload();
          message = this.intl.t('course.show_page.disenroll_successful');
          this.notify.success(message);
        }
      } catch (e) {
        message = this.intl.t('course.show_page.general_error');
        this.notify.alert(message);
      }
    }
  }
}
