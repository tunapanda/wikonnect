import Route from '@ember/routing/route';

export default class ManageRoute extends Route {
  model() {
    return this.store.query('chapter', { status: 'published' });
  }
}
