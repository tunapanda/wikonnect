import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class CourseModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @attr() enrolled;
  @attr('number') progress;
  @attr() permission;
  @belongsTo('user') creator;
  @hasMany('module') modules;
  @hasMany('comment') comments;
}
