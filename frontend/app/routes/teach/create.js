import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TeachCreateRoute extends Route {
  @inject
  me;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      let loginController = this.controllerFor("login");
      loginController.set("previousTransition", transition);
      this.transitionTo("login");
    }
  }

  model() {
    return this.store.createRecord("chapter", {
      creator: this.me.get("user"),
    });
  }
}