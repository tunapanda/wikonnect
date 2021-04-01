import Model, { attr } from '@ember-data/model';

export default class ReviewQuestionModel extends Model {
  @attr('string') category;
  @attr('string') title;
}
