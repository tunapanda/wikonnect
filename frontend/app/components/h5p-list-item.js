import Component from '@glimmer/component';
import {inject as service} from '@ember/service';

export default class H5pListItemComponent extends Component {
  @service config;

  color = Math.floor(Math.random() * 16777215).toString(16);

}
