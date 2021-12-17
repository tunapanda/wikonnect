import Route from '@ember/routing/route';

export default class TeachReviewsRoute extends Route {
  model(params) {
    return this.store.query('review', {
      chapterId: params.chapter_id,
      isDeleted: 'false',
    });
  }
}
