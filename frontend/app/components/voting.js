// import Component from '@glimmer/component'; @jake
import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class LessonVotingComponent extends Component {
  @inject
  me;

  @action
  upvoteLesson(model) {
    console.log(model);
  }

  @action
  downvoteLesson(model) {
    console.log(model);
  }
}
