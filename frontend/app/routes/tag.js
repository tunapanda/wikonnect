import Route from '@ember/routing/route';

export default class TagRoute extends Route {

  model() {
    return this.store.findAll('chapter');

  }
}
