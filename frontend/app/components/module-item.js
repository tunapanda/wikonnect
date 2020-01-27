import Component from '@glimmer/component';
import { inject } from '@ember/service';

export default class ModuletemComponent extends Component {

  @inject
  me;
}
