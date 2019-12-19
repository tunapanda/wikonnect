import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class CourseIndexController extends Controller {

  colorList = ['54378B', 'F57010', '32A583']

  @computed('model.modules.@each.name')
  get modList() {
    return this.model.get('modules').map((mod, index) => {
      let colorIndex = index % 3;

      return {
        'color': this.colorList[colorIndex],
        'name': mod.get('name'),
        'slug': mod.get('slug'),
        'description': mod.get('description')
      }

    })
  }

}