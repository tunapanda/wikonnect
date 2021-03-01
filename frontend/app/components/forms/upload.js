import {action} from '@ember/object';
import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class UploadComponent extends Component {

  @tracked
  fileControl;

  @action
  select() {
    this.fileControl.click();
  }

  @action
  inputChange(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.args.filesSelected(this.fileControl.files);
  }

  @action
  initFileControl(elem) {
    this.fileControl = elem;
  }
}
