import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default class ManageController extends Controller {
  @inject
  me


  @computed()
  get chapters() {
    return this.store.findAll('chapter');
  }
}
