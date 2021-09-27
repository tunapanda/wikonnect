import Model, { attr } from '@ember-data/model';

export default class ReviewQuestionModel extends Model {
  @attr('string') category;
  @attr('string') title;
  @attr() options;
  @attr('number') priority;
  @attr('boolean') default;
}
