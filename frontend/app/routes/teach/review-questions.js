import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachReviewQuestionsRoute extends Route {
  @service me;

  async model({ id }) {
    return Promise.all([
      this.store.findRecord('chapter', id),
      this.store.findAll('review-question'),
    ]);
  }
}
