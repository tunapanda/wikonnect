import Model, { belongsTo, attr } from '@ember-data/model';

export default class ReactionModel extends Model {

  @attr('string') reaction;
  @belongsTo('chapter', {inverse: null}) chapter;
  @belongsTo('user', {inverse: null}) user;
}
