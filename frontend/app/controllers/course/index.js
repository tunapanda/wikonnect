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


  get isEnrolled() {
    if (this.model.enrollments.length == 0) {
      return {
        status: "false"
      };
    } else {
      console.log("this.model.e");
      console.log(this.model.enrollments.get("firstObject").status);
      console.log(this.model.enrollments.get("firstObject"));
      return this.model.enrollments.get("firstObject");
    }
  }

  @action
  async enroll(course_id) {
    console.log("enrolling");
    console.log(this.me.user.id);

    console.log(course_id);
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