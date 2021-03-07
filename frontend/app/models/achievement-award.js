import Model, { attr } from '@ember-data/model';
export default class AchievementAwardModel extends Model {
  @attr() name;
  @attr() imageUrl;
  @attr() createdAt;
}
