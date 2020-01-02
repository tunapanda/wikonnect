import Route from '@ember/routing/route';

export default class CoursesModulesLessonsIndexRoute extends Route {

  model(params) {
    console.log("params");
    console.log(params);
    return this.store.findBySlug('chapter', params.chapter_slug);
  }
}
