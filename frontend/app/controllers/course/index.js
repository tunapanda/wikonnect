import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { inject } from '@ember/service';


export default class CourseIndexController extends Controller {

  @inject
  me

  confirmModal = false;

  colorList = ['54378B', 'F57010', '32A583']

  @computed('model.modules.@each.name')
  get modList() {
    return this.model.get('modules').map((mod, index) => {
      let colorIndex = index % 3;

      return {
        'color': this.colorList[colorIndex],
        'name': mod.get('name'),
        'slug': mod.get('slug'),
        'progress': mod.get('progress'),
        'permission': mod.get('permission'),
        'description': mod.get('description')
      };

    });
  }

  @action
  showConfirmModal() {
    this.set('confirmModal', true);
  }

  @action
  hideConfirmModal() {
    this.set('confirmModal', false);
  }

  get isEnrolled() {
    if (this.model.enrollments.length == 0) {
      return {
        status: 'false'
      };
    } else {
      return this.model.enrollments.get('firstObject');
    }
  }

  @action
  async enroll(course_id) {
    let enrollment = this.store.createRecord('enrollment');
    enrollment.set('course_id', course_id);
    let en = await enrollment.save();
  }

  @action
  async reenroll(enrollment_id) {
    let enroll = await this.store.findRecord('enrollment', enrollment_id);
    enroll.set('status', true);
    enroll.save();
  }


  @action
  async leave(enrollment_id) {
    let enroll = await this.store.findRecord('enrollment', enrollment_id);
    enroll.set('status', false);
    this.set('toggleConfirm', false);

    enroll.save();


  }

}