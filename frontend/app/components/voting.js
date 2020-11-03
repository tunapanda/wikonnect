// import Component from '@glimmer/component'; @jake
import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class LessonVotingComponent extends Component {
  @inject
  me;

  @action
  upvoteLesson(model) {
    return model;
  }

  @action
  downvoteLesson(model) {
    return model;
  }
}
