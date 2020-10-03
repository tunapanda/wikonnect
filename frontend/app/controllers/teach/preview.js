import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class TeachPreviewController extends Controller {

  @inject notify;

  @action
  togglePublish(chapter_id, a) {
    console.log("ee")
    console.log(chapter_id)
    console.log(a)
    this.this.store.findRecord('chapter', chapter_id).then(function (c) {
      c.status = "published"
      c.save()
    });
    // if (a == "true") {
    //   this.store.findRecord('chapter', chapter_id).then(function (chap) {
    //     // ...after the record has loaded

    //     chap.set('status', "draft");
    //     chap.save();
    //   });
    // } else {
    //   this.store.findRecord('chapter', chapter_id).then(function (chap) {
    //     // ...after the record has loaded
    //     chap.set('status', "published");

    //     chap.save();

    //   });

    // }
  }

  @inject
  me
}
