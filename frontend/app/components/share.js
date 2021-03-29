import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ShareComponent extends Component {
  @tracked
  isShowingModal = false;
  baseURL = window.location;

  @action
  toggleModal() {
    this.isShowingModal = !this.isShowingModal;
  }

  get facebookShareUrl() {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.baseURL}`;
  }

  get twitterShareUrl() {
    return `https://twitter.com/intent/tweet?text=${this.args.chapterName}&url=${this.baseURL}`;
  }

  get mailShareUrl() {
    return `mailto:?subject=Wikonnect Lesson: ${this.args.chapterName}&body=${this.baseURL}`;
  }

  get redditShareUrl() {
    return `http://www.reddit.com/submit?url=${this.baseURL}&title=${this.args.chapterName}`;
  }
}
