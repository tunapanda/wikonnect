import Controller from '@ember/controller';
import { computed } from '@ember/object';
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

}