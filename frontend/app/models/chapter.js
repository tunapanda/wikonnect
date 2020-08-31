import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

const { Model, attr, belongsTo } = DS;


export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentType;
  @attr contentUri;
  @attr approved;
  @attr targetStatus;
  @attr imageUrl;
  @hasMany('rating', { async: false }) ratings;

  @belongsTo('user') creator;
  // @belongsTo('lesson') lesson;


}
