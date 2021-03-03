import Component from '@glimmer/component';

export default class TeachListItemComponent extends Component {
  color = Math.floor(Math.random() * 16777215).toString(16);
}
