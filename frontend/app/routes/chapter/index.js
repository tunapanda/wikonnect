import Route from '@ember/routing/route';

export default class ChapterIndexRoute extends Route {
  model(params) {
    return this.store.findRecord('chapter', params.chapter_slug);
  }
}
