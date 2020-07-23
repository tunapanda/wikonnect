import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service
  me

  colorList = ['54378B', 'F57010', '32A583']

  @computed('model.[]')
  get allChapters(){
    return this.store.query('chapter', { "approved": true });
  }
}