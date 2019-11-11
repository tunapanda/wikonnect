import DS from 'ember-data';
const { Model } = DS;

export default class ActivityModel extends Model {
  @attr() status;
  @attr() progress;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
