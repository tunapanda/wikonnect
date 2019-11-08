import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class LessonModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @belongsTo('user') creator;
}
