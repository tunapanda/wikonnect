import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class CourseModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @attr('number', { defaultValue: 0 }) totalEnrolled;
  @attr() updatedAt;
  @attr() createdAt;
  @attr() metadata;
  @attr() thumbnailUrl;

  @belongsTo('user') creator;
  @hasMany('tag') tags;
  @hasMany('chapter') playlist;
}
