import Model, { belongsTo, attr } from '@ember-data/model';

export default class ActivityModel extends Model {
  @attr() status;
  @attr() progress;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
