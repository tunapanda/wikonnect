import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NavMenuUserAccountDropdownComponent extends Component {
  @service me;
}
