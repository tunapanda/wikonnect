import Route from '@ember/routing/route';

export default class ResetPasswordRoute extends Route {
  model(params) {
    if (params.email && params.token) {
      return params;
    }

    this.transitionTo('forgot_password');
  }
}
