import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';


export default
@classNames('upload-button')
class UploadComponent extends Component {
  @action
  select() {
    this.element.querySelector('input').click();
  }

  @action
  inputChange() {
    let files = this.element.querySelector('input').files;
    // this.set('files', files);
    this.filesSelected(files);
  }
}
