import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChapterIndexRoute extends Route {
  @service me;

  model(params) {
    return this.store.findRecord('chapter', params.chapter_slug);
  }

  afterModel(model) {
    return {
      comments: this.store.query('comment', { chapterId: model.id }),
    };
  }
}
