import Model, { belongsTo, attr } from '@ember-data/model';

export default class AchievementModel extends Model {
  @attr() description;
  @attr() userId;
  @attr() targetStatus;
  @attr() target;

  @belongsTo('user') user;
}
