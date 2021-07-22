import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChapterFeedbackComponent extends Component {
  @service store;
  @service me;
  
  @tracked feedback;

  constructor(owner, args) {
    super(owner, args);

    // load messages when component is created
    this.feedback = this.store.query('chapterFeedback', {
      chapterId: this.args.chapter.id,
    });
  }

  @action
  loadFeedback() {
    // load messages after component is created
    this.feedback = this.store
      .peekAll('chapterFeedback')
      .filter((feedback) => feedback.chapterId === this.args.chapter.id);
  }
}
