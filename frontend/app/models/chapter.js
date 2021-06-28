import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentId;
  @attr contentType;
  @attr contentUri;
  @attr('boolean') approved;
  @attr('boolean') verified;
  @attr targetStatus;
  @attr imageUrl;
  @attr createdAt;
  @attr reaction;
  @attr authenticatedUser;
  @attr views;
  @hasMany('comment') comment;
  @attr author;
  @attr reviewQuestions;

  @belongsTo('user') creator;
  @hasMany('tag') tags;
}
