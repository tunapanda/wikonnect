import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentType;
  @attr contentUri;
  @attr('boolean') approved;
  @attr tags;
  @attr targetStatus;
  @attr imageUrl;
  @attr createdAt;
  @attr reaction;
  @attr authenticatedUser;
  @hasMany('comment') comments;

  @belongsTo('user') creator;
  // @belongsTo('lesson') lesson;
}
