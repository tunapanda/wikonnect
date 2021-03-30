import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CommentSectionComponent extends Component {
  @service me;
  @service session;
  @service store;
  @service notify;

  @tracked comment;

  get commentsTotal() {
    return this.args.chapterComments.length;
  }

  get profileUri() {
    return this.me.user.profileUri;
  }

  @action
  saveComment(e) {
    e.preventDefault();
    if (!this.comment) {
      return;
    }
    const model = this.store.createRecord('comment', {
      creator: this.me.user,
      chapter: this.store.peekRecord('chapter', this.args.selectedChapter),
      comment: this.comment,
    });

    // model.chapter = this.store.peekRecord('chapter', this.args.selectedChapter);
    model
      .save()
      .then(() => {
        this.comment = '';
        this.notify.success('Comment added successfully', { closeAfter: 6000 });
      })
      .catch(() => {
        this.comment = model.comment;
        model.deleteRecord();
        this.notify.alert('Be mindful of your comments', { closeAfter: 6000 });
      });
  }
}
