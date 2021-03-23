import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AboutRoute extends Route {
  @service SeoTags;

  afterModel() {
    this.headTags = this.SeoTags.build('About Us - Wikonnect', '/about');
  }
}
