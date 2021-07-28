import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CourseShowController extends Controller {
  @service me;
  @service notify;
  @service intl;

  get course() {
    return this.model[0];
  }
  get popularCourses() {
    return this.model[1];
  }
  get popularTags() {
    //sort to ensure long tags are displayed last
    return this.model[2].toArray().sort((a, b) => {
      return a.name.length > b.name.length ? 1 : -1;
    });
  }

  get playlist() {
    return this.course.get('playlist').sortBy('rank');
  }
  get isMyCourse() {
    return this.me.id === this.course.get('creator').get('id');
  }

  get isEnrolled() {
    return (
      this.course.courseEnrollments &&
      this.course.courseEnrollments.findBy('userId', this.me.id)
    );
  }

  @action
  async enroll() {
    let message = this.intl.t('course.show_page.enrolled_successfully');
    const enrollment = this.store.createRecord('course-enrollment', {
      userId: this.me.id,
      course: this.course,
    });
    try {
      await enrollment.save();
      await this.course.reload();
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
        const enrollment = this.course.courseEnrollments.findBy(
          'userId',
          this.me.id
        );
        if (enrollment) {
          await enrollment.destroyRecord();
          await this.course.reload();
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
