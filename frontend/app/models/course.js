import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default class CourseModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @attr() slug;
  @belongsTo('user') creator;
  @hasMany('module') modules;
}
