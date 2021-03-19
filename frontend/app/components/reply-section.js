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

  get replyModel() {
    return this.store.createRecord('comment', {
      creator: this.me.user,
      chapter: this.args.selectedChapter,
      comment: this.reply,
      parentId: this.args.comment.id,
    });
  }

  get numOfReplies() {
    return this.replies.length;
  }

  get replies() {
    return this.args.chapterReplies.filter(
      (reply) => reply.parentId === this.args.comment.id
    );
  }

  // @action
  // async getReplies() {
  //   const replies = await this.store.query('comment', { 
  //     chapterId: this.args.selectedChapter.id, 
  //     parentId: this.args.parent.id 
  //   });
  //   console.log(replies);
  //   // return this.args.parent.replies.length;
  // }

  @action
  toggleReplies() {
    this.shouldRepliesShow = !this.shouldRepliesShow;
  }

  @action
  toggleForm() {
    this.shouldFormShow = !this.shouldFormShow;
  }

  @action
  saveReply(model) {
    model.chapter = this.store.peekRecord('chapter', this.args.selectedChapter);
    model
      .save()
      .then(() => {
        this.reply = '';
        this.notify.success('Comment added successfully', { closeAfter: 6000 });
      })
      .catch((err) => {
        console.log(err);
        this.reply = model.comment;
        // model.deleteRecord();
        this.notify.alert('Be mindful of your comments', { closeAfter: 6000 });
      });
  }
}
