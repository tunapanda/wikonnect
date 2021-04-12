import Model, { belongsTo, attr } from '@ember-data/model';

export default class RatingModel extends Model {
  @attr reaction;
  @attr metadata;
  @attr averageRating;
  @attr review;
  @attr('Boolean') isDeleted;
  @attr('Date') createdAt;
  @attr('Date') updatedAt;

  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
