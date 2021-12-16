import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachPreviewRoute extends Route {
  @service me;
  @service router;
  @service intl;
  @service notify;

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }

  afterModel(resolvedModel) {
    if (this.me.id !== resolvedModel.creator.get('id')) {
      this.notify.error(this.intl.t('teach.index.no_permission'), {
        closeAfter: 3000,
      });
      return this.router.transitionTo('teach');
    }
  }
}
