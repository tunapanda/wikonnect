import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChapterStarRatingComponent extends Component {
  score = {
    terrible: 1,
    bad: 2,
    okay: 3,
    good: 4,
    great: 5,
  };

  @tracked selected = this.args.rating || 0;

  @action
  updateSelectedRating(level) {
    if (this.args.onChange) {
      this.args.onChange(this.args.ref, level);
    }
    this.selected = level;
  }
}
