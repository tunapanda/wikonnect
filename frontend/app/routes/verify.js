import Route from '@ember/routing/route';

export default class VerifyRoute extends Route {
  model(params) {
    if (params.email && params.token) {
      return params;
    }

    this.transitionTo('index');
  }
}
