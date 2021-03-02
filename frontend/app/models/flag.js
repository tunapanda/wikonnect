import Model, { belongsTo, attr } from '@ember-data/model';

export default class FlagModel extends Model {
  @attr comment;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
