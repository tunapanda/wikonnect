import Route from '@ember/routing/route';

export default class LessonIndexRoute extends Route {
  model(params) {
    return this.store.findBySlug('lesson', params.lesson_slug);
  }
}
