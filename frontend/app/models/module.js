import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

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
