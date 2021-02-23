import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachIndexRoute extends Route {
  @service session;

  @service me


  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }

  async model() {
    return this.store.query('chapter', { 
      creatorId: this.me.user.id, 
      status: 'draft'
    });
  }
}
