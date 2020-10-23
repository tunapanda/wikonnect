import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class ChapterIndexRoute extends Route {
  @inject
  me

  beforeModel() {
    return this.store.findAll('chapter');
  }

  model() {
    // return this.store.findRecord('chapter', params.chapter_slug);
  }
}
