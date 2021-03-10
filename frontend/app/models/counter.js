import Model, { attr } from '@ember-data/model';

export default class CounterModel extends Model {
  @attr('string') chapterId;
  @attr('string') trigger;
  @attr() counter;
  // @belongsTo('chapter') chapter;
}
