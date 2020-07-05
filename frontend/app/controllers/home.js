import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service
  me

  colorList = ['54378B', 'F57010', '32A583']

    // { { log chapter.imageUrl } }

  @computed('model.[]')
  get allChapters(){
    return this.store.query('chapter', { "approved": true });
  }

  // get courseList() {
  //   return this.model.enrolledCourses.map((course, index) => {
  //     let colorIndex = index % 3;

  //     return {
  //       'color': this.colorList[colorIndex],
  //       'name': course.get('name'),
  //       'slug': course.get('slug'),
  //       'progress': course.get('progress'),
  //       'description': course.get('description'),
  //       'module': course.get('module')
  //     };

  //   });
  // }
}