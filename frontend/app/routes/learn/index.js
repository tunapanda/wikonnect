import Route from '@ember/routing/route';

export default class LearnIndexRoute extends Route {
  beforeModel() {
    return this.transitionTo('learn.chapters');
  }
}
