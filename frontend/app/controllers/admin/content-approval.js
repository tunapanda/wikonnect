import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminContentApprovalController extends Controller {
  @service store;

  @action
  async toggleApproval(chapterId, choice) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      chapter.approved = choice;
      await chapter.save();
    } catch (e) {
      chapter.approved = !choice;
    }
  }
}
