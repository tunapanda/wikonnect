import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManageRoute extends Route {
  @service SeoTags;

  model() {
    return this.store.query('chapter', { status: 'published' });
  }
  afterModel() {
    this.headTags = this.SeoTags.build(
      'Manage Chapters - Wikonnect',
      '/manage',
      undefined,
      false,
      false
    );
  }
}
