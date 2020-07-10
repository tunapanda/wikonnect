import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class CoursesController extends Controller {

  colorList = ['54378B', 'F57010', '32A583']

  @computed('model.[]')
  get courseList() {
    return this.model.map((course, index) => {
      let colorIndex = index % 3;

      return {
        'color': this.colorList[colorIndex],
        'name': course.get('name'),
        'slug': course.get('slug'),
        'progress': course.get('progress'),
        'modules': course.get('modules'),
        'description': course.get('description')
      };
    });
  }
}
