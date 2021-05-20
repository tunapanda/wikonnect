import Route from '@ember/routing/route';

export default class AdminBadgesUsersRoute extends Route {
  async afterModel(resolvedModel, transition) {
    await this.store.query('badge', { isDeleted: false });
    return super.afterModel(resolvedModel, transition);
  }
}
