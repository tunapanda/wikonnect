import Model, { attr } from '@ember-data/model';

export default class ReactionModel extends Model {
  @attr reaction;
  @attr chapterId;
  @attr userId;
}
