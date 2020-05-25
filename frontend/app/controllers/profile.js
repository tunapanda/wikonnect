import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';

export default class ProfileController extends Controller {

  editing = false;

  @inject
  me;

  queryParams = ['view'];
  view = "Profile";

  @computed()
  get myProfile() {
    return this.me.user.id;
  }

  @action
  saveUser(model) {
    model.save();
  }


}
