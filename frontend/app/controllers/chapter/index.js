import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';


export default class ChapterIndexController extends Controller {
  @inject
  me

  @action
  toggleApproval(chapter_id, a) {
    if (a == "true") {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded

        chap.set('approved', false);
        chap.set('contentType', "false");
        chap.save();
      });
    } else {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded
        chap.set('approved', true);
        chap.set('contentType', "false");

        chap.save();

      });

    }
  }
}
