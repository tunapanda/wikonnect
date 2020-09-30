import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service
  me

  @computed('model.[]')
  get allChapters(){
    return this.store.query('chapter', { "approved": true });
  }
}