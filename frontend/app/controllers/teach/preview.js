import Controller from '@ember/controller';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class TeachPreviewController extends Controller {

  @inject notify;
  @inject session;
  token = this.session.data.authenticated.token


  @action
  async publish(chapter_id) {
    this.store.findRecord('chapter', chapter_id).then(function (chap) {
      // ...after the record has loaded

      chap.set('status', "published");
      chap.save();
    });


  }


  @action
  async unpublish(chapter_id) {
    this.store.findRecord('chapter', chapter_id).then(function (chap) {
      // ...after the record has loaded

      chap.set('status', "draft");
      chap.set('approved', false);
      chap.save();
    });

    console.log(response);

  }

  @inject
  me
}
