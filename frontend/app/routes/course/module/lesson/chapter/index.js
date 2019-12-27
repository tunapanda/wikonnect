import Route from '@ember/routing/route';

export default class CoursesModulesLessonsChaptersRoute extends Route {

  model(params) {
    console.log("params.chapter_slug");
    console.log(params.chapter_slug);
    console.log(this.store.findBySlug('chapter', params.chapter_slug));
    return this.store.findBySlug('chapter', params.chapter_slug);
  }
}
