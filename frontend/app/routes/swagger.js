import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class SwaggerRoute extends Route {

  @inject
  me;

  async beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
    return await this.store.findRecord('user', this.me.user.id);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
