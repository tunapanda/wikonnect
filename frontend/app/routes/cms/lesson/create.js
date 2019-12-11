import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class CmsLessonCreateRoute extends Route {
  @inject
  me

  model() {
    return this.store.createRecord('lesson', {
      creator: this.me.get('user'),
      status: 'published'
    });
  }
}
