import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class RatingModel extends Model {
  @attr rating;
  //@attr remark;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
