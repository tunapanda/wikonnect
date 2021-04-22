import Model, { attr, belongsTo } from '@ember-data/model';
import { eventCodes } from '../utils/events-classification';

export default class NotificationModel extends Model {
  @attr('string') title;
  @attr('string') body;
  @attr('string') eventType;
  @attr('string') itemId;
  @attr('string') model;
  @attr('boolean') read;
  @attr() metadata;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @belongsTo('user') recipient;
  @belongsTo('user') creator;

  /**
   * Resolve a route dynamically based on the model or event type
   */
  get route() {
    if (this.eventType === eventCodes.chapterComment.created) {
      return `chapter.index`;
    }

    if (this.eventType === eventCodes.chapterComment.ReplyCreated) {
      return `chapter.index`;
    }

    if (this.eventType === eventCodes.chapter.approved) {
      return `chapter.index`;
    }

    return undefined;
  }
}
