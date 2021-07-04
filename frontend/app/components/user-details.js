import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserDetailsComponent extends Component {
  @tracked
  isShowingModal = false;

  @action
  toggleModal() {
    this.isShowingModal = !this.isShowingModal;
  }
}
