import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  beforeModel() {
    return this.transitionTo('learn.chapters');
  }
}
