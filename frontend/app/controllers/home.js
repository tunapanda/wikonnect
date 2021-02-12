import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service
  me



  get allTags() {
    // this.model
    let filtered = [];
    this.model.map(c => {
      if (c.tags) {
        filtered.concat(c.tags);
      }
    });

    return ['filtered', 'ok'];
  }


}