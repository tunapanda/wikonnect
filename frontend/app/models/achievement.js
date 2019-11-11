import DS from 'ember-data';
const { Model } = DS;

export default class AchievementModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @belongsTo('activity') activity;
}
