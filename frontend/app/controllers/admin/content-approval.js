import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AdminContentApprovalController extends Controller {
  @service store;
  @service me;

  @tracked feedback;

  @action
  async toggleApproval(chapterId, choice) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      chapter.approved = choice;
      chapter.revisionRequested = false;
      await chapter.save();
    } catch (e) {
      chapter.approved = !choice;
    }
  }

  @action
  async requestRevision(chapterId) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      const model = this.store.createRecord('chapterFeedback', {
        comment: this.feedback,
        chapter: chapter,
        creator: this.me.user,
      });

      chapter.revisionRequested = true;
      await chapter.save();

      model
        .save()
        .then(() => {
          this.feedback = '';
        })
        .catch(() => {
          this.feedback = model.comment;
          model.deleteRecord();
        });
    } catch (e) {
      chapter.revisionRequested = false;
      await chapter.save();
    }
  }
}
