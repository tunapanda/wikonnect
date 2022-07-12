import Model, { attr, belongsTo } from '@ember-data/model';

export default class XapiModel extends Model {
  // @attr('string') chapterId;
  // @attr('string') userId;
  @attr() statement;
  @belongsTo('chapter') chapter;
  @belongsTo('user') user;
}
