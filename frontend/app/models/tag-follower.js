import Model, { attr, belongsTo } from '@ember-data/model';

export default class TagFollowerModel extends Model {
  @attr tagId;
  @attr updatedAt;
  @attr createdAt;
  @attr userId;

  @belongsTo('user') user;
  @belongsTo('tag') tag;
}
