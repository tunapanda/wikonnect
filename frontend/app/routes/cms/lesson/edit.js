import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class CmsLessonCreateRoute extends Route {
  @inject
  me

  model(params) {
    // return this.store.findRecord('lesson', params.lesson_id);
    return this.store.findBySlug('lesson', params.lesson_slug);
  }
}
