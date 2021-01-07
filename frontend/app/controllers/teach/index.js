import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';


export default class TeachIndexController extends Controller {
  @inject me


  @computed
  get courseList() {
    return this.store.query('chapter', { 'creatorId': this.me.user.id, 'status': 'draft' });


  }
}
