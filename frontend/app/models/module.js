import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class ModuleModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @attr() progress;
  @attr() permissions;

  @belongsTo('user') creator;
  @hasMany('course') courses;
  @hasMany('lesson') lessons;
}
