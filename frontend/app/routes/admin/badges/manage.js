import Route from '@ember/routing/route';

export default class AdminBadgesManageRoute extends Route {
  async model() {
    return await this.store.query('badge', { isDeleted: false });
  }

  async afterModel() {
    return await this.store.findAll('trigger');
  }
}
