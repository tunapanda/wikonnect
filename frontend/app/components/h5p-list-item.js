import Component from '@glimmer/component';
import {inject} from '@ember/service';

export default class H5pListItemComponent extends Component {
  @inject config;

  color = Math.floor(Math.random() * 16777215).toString(16);

}
