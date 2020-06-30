import Controller from '@ember/controller';
import { action } from '@ember/object';

import { inject } from '@ember/service';



export default class ChapterIndexController extends Controller {




  @inject
  me



  flaggingModal = false

  @action
  submit() { }

  @action
  toggleFlaggingModal() {
    this.toggleProperty('ratingsModal');
  }

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
