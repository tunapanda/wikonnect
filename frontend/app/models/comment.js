import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class CommentModel extends Model {
  @attr comment;
  @belongsTo('chapter') chapter;
  @belongsTo('user') creator;

}
