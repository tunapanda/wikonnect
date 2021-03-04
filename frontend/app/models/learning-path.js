import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class LearningPathModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @belongsTo('user') creator;
  @hasMany('course') courses;
}
