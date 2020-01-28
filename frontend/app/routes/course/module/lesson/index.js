import Route from '@ember/routing/route';

export default class CoursesModulesLessonsIndexRoute extends Route {

  model(params) {
    return this.store.findBySlug('lesson', params.lesson_slug);
  }
}
