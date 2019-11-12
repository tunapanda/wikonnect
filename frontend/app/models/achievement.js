import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default class AchievementModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @belongsTo('activity') activity;
}
