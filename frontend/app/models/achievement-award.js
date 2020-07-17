import DS from 'ember-data';

const { Model, attr } = DS;
export default class AchievementAwardModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() achievementId;
}
