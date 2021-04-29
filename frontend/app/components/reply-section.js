import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ReplySectionComponent extends Component {
  @service me;
  @service session;
  @service store;
  @service notify;

  @tracked reply;
  @tracked shouldRepliesShow = false;
  @tracked shouldFormShow = false;

  get numOfReplies() {
    return this.replies.length;
  }

  get replies() {
    return this.args.chapterReplies.filter(
      (reply) => reply.parentId === this.args.comment.id
    );
  }

  @action
  toggleReplies() {
    this.shouldRepliesShow = !this.shouldRepliesShow;
  }

  @action
  toggleForm() {
    this.shouldFormShow = !this.shouldFormShow;
    if (this.shouldFormShow) {
      this.shouldRepliesShow = true;
    }
  }

  @action
  saveReply(e) {
    e.preventDefault();
    if (!this.reply) {
      return;
    }
    const model = this.store.createRecord('comment', {
      creator: this.me.user,
      comment: this.reply,
      parentId: this.args.comment.id,
    });

    model.chapter = this.store.peekRecord('chapter', this.args.selectedChapter);
    model
      .save()
      .then(() => {
        this.reply = '';
        this.notify.success('Reply added successfully', { closeAfter: 6000 });
        this.shouldFormShow = false;
      })
      .catch(() => {
        // console.log(err);
        this.reply = model.comment;
        // model.deleteRecord();
        this.notify.alert('Be mindful of your comments', { closeAfter: 6000 });
      });
  }
}
