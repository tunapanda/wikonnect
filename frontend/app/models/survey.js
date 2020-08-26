import DS from 'ember-data';

const { Model, attr } = DS;

export default class SurveyModel extends Model {
  @attr userId;
  @attr question;
  @attr objective;
  @attr keyResult;
  @attr answer;
}
