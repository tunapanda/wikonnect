import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserFolloweeModel extends Model {
  @attr userId;
  @attr followeeId;
  @attr createdAt;
  @attr updatedAt;

  @belongsTo('user', { inverse: null }) followee;
}
