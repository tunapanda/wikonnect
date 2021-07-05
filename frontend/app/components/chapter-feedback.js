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

    this.feedback = this.store.query('chapterFeedback', {
      chapterId: this.args.chapter.id,
    });
  }
}
