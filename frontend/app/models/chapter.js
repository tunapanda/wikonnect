import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentType;
  @attr contentUri;

  @belongsTo('user') creator;
  @hasMany('lesson') lessons;
}
