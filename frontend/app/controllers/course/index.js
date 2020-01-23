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
    enrollment.set('creator_id', this.me.user.id);
    let en = await enrollment.save();
    console.log(en);

  }

}