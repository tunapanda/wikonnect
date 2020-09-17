import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service
  me

  mojaModalProfile = false
  mojaModalInvite = false
  mojaModalChapter = false

  @action
  toggleMojaModalProfile() {
    this.toggleProperty('mojaModalProfile');
  }

  @action
  toggleMojaModalInvite() {
    this.toggleProperty('mojaModalInvite');
  }

  @action
  toggleMojaModalChapter() {
    this.toggleProperty('mojaModalChapter');
  }
  @computed('model.[]')
  get allChapters(){
    return this.store.query('chapter', { "approved": true });
  }
}