import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { inject } from '@ember/service';


export default class CourseIndexController extends Controller {

  @inject
  me

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
  async enrollmentToggle(course_id) {
    console.log(course_id);
    console.log(this.me.user.id);

    let enrollment = this.store.createRecord('enrollment');
    enrollment.set('course_id', course_id);
    let en = await enrollment.save();
    console.log(en);
  }

  @action
  async reenroll(enrollment_id) {
    console.log("reenrolling");

    console.log(enrollment_id);
    let enroll = await this.store.findRecord('enrollment', enrollment_id);
    console.log(enroll.id);
    enroll.set("status", true);
    console.log(enroll);
    enroll.save();
  }


  @action
  async leave(enrollment_id) {
    console.log("leaving");

    console.log(enrollment_id);
    let enroll = await this.store.findRecord('enrollment', enrollment_id);
    console.log(enroll.id);
    enroll.set("status", false);
    console.log(enroll);
    enroll.save();

  }

}