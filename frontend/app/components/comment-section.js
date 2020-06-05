import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CommentSectionComponent extends Component {

  @service
  me

  @action
  saveComment() {

  }
}

