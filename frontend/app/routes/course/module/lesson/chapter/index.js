import Route from '@ember/routing/route';

export default class CoursesModulesLessonsChaptersRoute extends Route {

  model(params) {
    return this.store.findBySlug('chapter', params.chapter_slug);
  }
}
