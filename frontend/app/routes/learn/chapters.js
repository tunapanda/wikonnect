import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LearnChaptersRoute extends Route {
  queryParams = {
    tags: {
      refreshModel: true,
    },
  };
  @service infinity;

  model(params) {
    const query = {
      approved: true,
      perPage: 10,
      startingPage: 0,
    };
    if (params.tags) {
      query['tags'] = params.tags;
    }
    return this.infinity.model('chapter', query);
  }

  async afterModel() {
    return await this.store.query('tag', { chapterTagsOnly: true });
  }
}
