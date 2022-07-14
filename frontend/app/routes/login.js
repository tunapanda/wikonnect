import Route from '@ember/routing/route';
import { inject as service, inject } from '@ember/service';

export default class LoginRoute extends Route {
  @inject me;
  @service SeoTags;

  queryParams = {
    preauthtoken: {
      replace: true,
    },
  };

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('index');
    }
  }

  model() {
    return this.store.createRecord('user');
  }

  async afterModel(resolvedModel, transition) {
    this.headTags = this.SeoTags.build('Login - Wikonnect', '/login');
    if (transition.to.queryParams?.preauthtoken && !this.me.isAuthenticated) {
      await this.me.authenticateWithPreauthtoken(
        transition.to.queryParams.preauthtoken
      );
    }
  }
}
