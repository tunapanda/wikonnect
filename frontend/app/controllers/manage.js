import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default class ManageController extends Controller {
  @inject
  me


  @computed()
  get chapters() {
    return this.store.findAll('chapter');
  }
}
