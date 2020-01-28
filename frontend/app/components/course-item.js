import Component from '@glimmer/component';
import { inject } from '@ember/service';

export default class CourseItemComponent extends Component {

  @inject
  me;
}
