import Route from '@ember/routing/route';

export default class TeachTagRoute extends Route {

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }

}
