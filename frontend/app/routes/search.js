import Route from '@ember/routing/route';
import { queryParam } from 'ember-query-params-service';
import { inject as service } from '@ember/service';

export default class SearchRoute extends Route {
  @service router;
  @service SeoTags;

  @queryParam q;
  async model(params) {
    let filtered = [];
    // let strRegExPattern = '\\b' + params.id + '\\b';
    await this.store.query('chapter', { approved: true }).then((t) => {
      t.map((c) => {
        if (
          c.name.match(new RegExp(params.id, 'i')) ||
          c.description.match(new RegExp(params.id, 'i'))
        ) {
          //if (c.name.match("covid")) {
          // if (c.name.match(/${params.id}/i) || c.description.match(/${params.id}/i)) {

          filtered.push(c);
        }
      });
    });

    console.log(filtered);
    return filtered;
  }

  afterModel() {
    this.headTags = this.SeoTags.build(
      `You searched for ${this.paramsFor('search')} - Wikonnect`,
      '/search'
    );
  }
}
