import Component from '@glimmer/component';

export default class TeachAverageRatingComponent extends Component {
  get rating() {
    return parseFloat(this.args.record.ratings).toFixed(2);
  }
}
