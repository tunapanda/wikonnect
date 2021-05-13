import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminBadgeFormComponent extends Component {
  @service store;
  get model() {
    return this.args.model;
  }

  get triggers() {
    return this.store.peekAll('trigger');
  }

  parseDate(d) {
    if (!d) {
      return '';
    }
    const obj = new Date(d);
    return obj.toISOString().substr(0, 10);
  }

  @action
  submitForm(model) {
    console.log('--->', model);
  }
  @action
  triggerSelected(setFormValue, evt) {
    if (setFormValue) {
      setFormValue(evt.target.selectedOptions[0].value);
    }
  }
}
