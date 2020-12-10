import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';


export default class ManageController extends Controller {
  @inject
  me


  @computed()
  get chapters() {
    return this.store.query('chapter', { 'status': 'published' });
  }
}
