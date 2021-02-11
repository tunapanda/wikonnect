import Model, {attr, belongsTo} from '@ember-data/model';

export default class ReactionModel extends Model {
  @attr('string') reaction;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  @belongsTo('chapter', {inverse: null}) chapter;
  @belongsTo('user') user;
}
