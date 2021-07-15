import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Perspective from 'perspective-api-client';

export default class ReplySectionComponent extends Component {
  @service me;
  @service session;
  @service store;
  @service notify;
  @service config;

  @tracked reply;
  @tracked errors;
  @tracked height;
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

  calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    console.log(numberOfLineBreaks);
    return `height: ${newHeight}px`;
  }

  @action
  async checkComment() {
    const text = this.reply;
    this.height = this.calcHeight(this.reply);
    let res;
    if (!text) {
      return;
    } else {
      const perspective = new Perspective({
        apiKey: this.config.get('PERSPECTIVE_API_KEY').apiKey,
      });
      const result = await perspective.analyze({
        comment: { text },
        requestedAttributes: {
          TOXICITY: { scoreThreshold: 0.7 },
          IDENTITY_ATTACK: { scoreThreshold: 0.7 },
          UNSUBSTANTIAL: {},
        },
        spanAnnotations: true,
      });

      res = parseInt(
        result?.attributeScores?.TOXICITY?.summaryScore?.value * 100
      );
      this.errors = res;
      return res;
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
      .catch((err) => {
        console.log(err);
        this.reply = model.comment;
        // model.deleteRecord();
        this.notify.alert('Be mindful of your comments', { closeAfter: 6000 });
      });
  }
}
