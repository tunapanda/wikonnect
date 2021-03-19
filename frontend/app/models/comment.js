import Model, { belongsTo, attr, hasMany } from '@ember-data/model';

export default class CommentModel extends Model {
  @attr comment;
  @attr parentId;
  @belongsTo('chapter') chapter;
  @belongsTo('user') creator;
}
