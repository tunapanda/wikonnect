import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UploadRoute extends Route {
  @service SeoTags;

  afterModel() {
    this.headTags = this.SeoTags.build(
      'Upload Profile Picture - Wikonnect',
      '/upload',
      undefined,
      false,
      false
    );
  }
}
