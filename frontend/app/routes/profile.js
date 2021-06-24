import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service me;
  @service SeoTags;

  async model({ id }) {
    return await this.store.findRecord('user', id);
  }

  afterModel(resolvedModel, transition) {
    this.headTags = this.SeoTags.build(
      ` ${resolvedModel.name} Profile - Wikonnect`,
      '/profile',
      undefined,
      false,
      false
    );
    return super.afterModel(resolvedModel, transition);
  }
}
