import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotFoundRoute extends Route {
  @service SeoTags;

  afterModel() {
    this.headTags = this.SeoTags.build(
      'Page not found - Wikonnect',
      '/404',
      undefined,
      false,
      true
    );
  }
}
