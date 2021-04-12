import Model, { belongsTo, attr } from '@ember-data/model';

export default class ReviewModel extends Model {
  @attr reaction;
  @attr metadata;
  @attr('Boolean') isDeleted;
  @attr('Date') createdAt;
  @attr('Date') updatedAt;

  @belongsTo('rating') rating;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
