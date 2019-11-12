import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default class ActivityModel extends Model {
  @attr() status;
  @attr() progress;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
