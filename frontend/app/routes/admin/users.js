import Route from '@ember/routing/route';

export default class AdminUsersRoute extends Route {

  async model() {
    return await this.store.findAll('user');
  }

  async afterModel() {
    return await this.store.findAll('group');
  }
}
