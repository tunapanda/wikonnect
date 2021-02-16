import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;
import { hasMany } from 'ember-data/relationships';

export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentType;
  @attr contentUri;
  @attr('boolean') approved;
  @attr tags;
  @attr targetStatus;
  @attr imageUrl;
  @attr createdAt;
  // Getting an error when publishing a chapter that reaction
  // doesn't exist in chapter table. Commenting this out fixes it.
  // @attr reaction;
  @hasMany('comment') comments;

  @belongsTo('user') creator;
  // @belongsTo('lesson') lesson;


}
