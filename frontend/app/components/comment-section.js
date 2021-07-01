import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Perspective from 'perspective-api-client';
export default class CommentSectionComponent extends Component {
  @service me;
  @service session;
  @service store;
  @service notify;
  @service config;

  @tracked errors;
  @tracked comment;
  @tracked height;
  @tracked disabled = 'false';

  get commentsTotal() {
    return this.args.chapterComments.length;
  }

  get profileUri() {
    return this.me.user.profileUri;
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
    const text = this.comment;
    this.height = this.calcHeight(this.comment);
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
      this.disabled = 'true';
      return res;
    }
  }

  @action
  async saveComment(e) {
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
