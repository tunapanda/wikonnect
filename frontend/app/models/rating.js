import Model, { belongsTo, attr } from '@ember-data/model';

export default class RatingModel extends Model {
  @attr rating;
  //@attr remark;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
