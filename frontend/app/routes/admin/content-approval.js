import Route from '@ember/routing/route';

export default class AdminContentApprovalRoute extends Route {
  async model() {
    return await this.store.query('chapter', {
      status: 'published'
    });
  }
}
