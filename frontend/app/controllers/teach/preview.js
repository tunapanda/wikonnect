import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class TeachPreviewController extends Controller {

  @service notify;
  @service session;
  @service me;

  token = this.session.data.authenticated.token;


  @action
  async publish(chapter_id) {
    let chapter = this.store.peekRecord('chapter', chapter_id);
    chapter.status = 'published';
    await chapter.save();

  }


  @action
  async unpublish(chapter_id) {
    let chapter = this.store.peekRecord('chapter', chapter_id);
    chapter.status = 'draft';
    chapter.approved = false;
    await chapter.save();
  }


}
