import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default class TeachIndexController extends Controller {
  @inject me



  get courseList() {
    return this.store.query('chapter', { 'creatorId': this.me.user.id });

  }
}
