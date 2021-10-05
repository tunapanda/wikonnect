import Component from '@glimmer/component';

export default class TeachAverageRatingComponent extends Component {
  get rating() {
    return typeof this.args.record.ratings === 'number' ? this.args.record.ratings.toFixed(2) : null;
  }
}
