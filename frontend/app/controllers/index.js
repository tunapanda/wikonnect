import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default class IndexController extends Controller {


  @inject
  me;


  @computed()
  get myProfile() {

    return this.me.user;
  }
}
