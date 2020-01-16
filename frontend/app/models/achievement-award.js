import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;
export default class AchievementAwardModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;

}
