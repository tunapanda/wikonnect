import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class TagModel extends Model {
  @attr name;
  @attr slug;
  @attr metadata;
  @belongsTo('user') creator;
  @attr('boolean') canDelete;
  @attr createdAt;
  @attr updatedAt;
  @attr('number') coursesCount;
  @attr('number') chaptersCount;
  @attr('number') followersCount;

  @hasMany('tag-follower') tagFollowers;
}
