import Route from '@ember/routing/route';

export default class AdminBadgesHomeRoute extends Route {
  async model() {
    return await this.store.query('badge', { isDeleted: false });
  }
}
