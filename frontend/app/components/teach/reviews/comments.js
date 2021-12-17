import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { decamelize } from '@ember/string';

export default class TeachReviewsCommentsComponent extends Component {
  @tracked
  isShowingModal = false;

  @action
  toggleModal() {
    this.isShowingModal = !this.isShowingModal;
  }

  get remarks() {
    const obj = [];
    const record = this.args.record;

    const icon = {
      0: null,
      1: 'terrible-face-emoji',
      2: 'bad-face-emoji',
      3: 'okay-face-emoji',
      4: 'good-face-emoji',
      5: 'greate-face-emoji',
    };

    Object.keys(record.metadata).forEach((key) => {
      obj.push({
        criteria: decamelize(key).replace('_', ' '),
        rating: record.rating.get('metadata')[key],
        icon: icon[record.rating.get('metadata')[key]],
        details: record.metadata[key],
      });
    });

    return obj;
  }
}
