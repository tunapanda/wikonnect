import Component from '@glimmer/component';

export default class H5pListItemComponent extends Component {


  color = Math.floor(Math.random() * 16777215).toString(16);

  // @computed('model.chapter.imageUrl')
  // get profileUri() {
  //   return this.me.chapter.imageUrl;
  // }

  // @computed('model.[]')
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
