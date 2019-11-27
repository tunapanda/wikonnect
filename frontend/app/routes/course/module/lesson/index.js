import Route from '@ember/routing/route';

export default class CoursesModulesLessonsIndexRoute extends Route {
  model(params) {
    console.log("lesson");
    console.log(params);
    return this.store.findBySlug('lesson', params.lesson_slug);
  }
}
