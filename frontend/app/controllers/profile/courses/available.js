import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileCoursesAvailableController extends Controller {
  @service store;
  @service me;
  @service intl;
  @service notify;
  @tracked searchTerm;
  @tracked sortBy;

  get courses() {
    return this.store
      .peekAll('course')
      .filter((course) => course.id && course.status === 'published');
  }

  sortCourses(courses) {
    if (!this.sortBy || !this.sortBy.value) {
      return courses.sortBy('updatedAt').reverse();
    }
    if (this.sortBy.value === 'followersCount') {
      return courses.sortBy('totalEnrolled').reverse();
    }

    if (this.sortBy.value === 'tagsCount') {
      return courses.sort((a, b) => {
        const aTagsCount = a.tags ? a.tags.length : 0;
        const bTagsCount = b.tags ? b.tags.length : 0;
        return aTagsCount > bTagsCount ? -1 : 1;
      });
    }
  }

  get filteredCourses() {
    if (this.searchTerm) {
      const filtered = this.courses.filter((course) => {
        return (
          course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      });
      return this.sortCourses(filtered);
    }

    return this.sortCourses(this.courses);
  }

  @action
  setSortBy(title, value) {
    this.sortBy = { title, value };
  }

  @action
  isEnrolled(course) {
    return (
      course.courseEnrollments &&
      course.courseEnrollments.findBy('userId', this.me.id)
    );
  }

  @action
  async enroll(course) {
    let message = this.intl.t(
      'profile.available_courses_page.enroll_successful'
    );
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
      message = this.intl.t('profile.available_courses_page.general_error');
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
