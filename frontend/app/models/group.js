import Model, { hasMany, attr } from '@ember-data/model';

export default class GroupModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @hasMany('user') members;
}
