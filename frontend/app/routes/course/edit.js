import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CourseEditRoute extends Route {
  @service me;
  @service router;
  @service notify;
  @service intl;

  model({ id }) {
    return this.store.find('course', id);
  }

  afterModel(resolvedModel) {
    if (this.me.id !== resolvedModel.creator.get('id')) {
      this.notify.error(this.intl.t('course.errors.edit_access_error'));
      return this.router.transitionTo('course.create');
    }
    return Promise.all([
      this.store.query('chapter', { approved: true }),
      this.store.query('tag', { courseTagsOnly: true }),
    ]);
  }
}
