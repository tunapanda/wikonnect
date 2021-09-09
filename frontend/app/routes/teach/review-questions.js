import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachReviewQuestionsRoute extends Route {
  @service me;
  @service router;
  @service intl;
  @service notify;

  async model({ id }) {
    return Promise.all([
      this.store.findRecord('chapter', id),
      this.store.findAll('review-question'),
    ]);
  }

  afterModel(resolvedModel) {
    if (this.me.id !== resolvedModel[0].creator.get('id')) {
      this.notify.error(this.intl.t('teach.index.no_permission'), { closeAfter: 3000 });
      return this.router.transitionTo('teach');
    }
  }
}
