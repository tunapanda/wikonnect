import Model, { attr, belongsTo } from '@ember-data/model';
import { notificationTypes } from '../utils/notification-constants';
import { inject as service } from '@ember/service';

export default class NotificationModel extends Model {
  @service router;

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

  get url() {
    return this.resolveDynamicProps.url;
  }

  get svgIcon() {
    return this.resolveDynamicProps.svgIcon;
  }

  get iconUrl() {
    return this.resolveDynamicProps.iconUrl;
  }
  /**
   * Resolve dynamic properties based on the model or/and event type
   */
  get resolveDynamicProps() {
    // survey unlocked notification
    if (this.model === 'survey') {
      return {
        url: this.router.urlFor('surveys', this.itemId),
        svgIcon: 'form',
      };
    }

    // comment created notification
    if (this.model === 'comment' && notificationTypes.comment.created) {
      return {
        url: this.router.urlFor('chapter.index', this.itemId),
        iconUrl: '/images/chat.png',
      };
    }

    // badge unlocked notification
    if (this.model === 'badge' && notificationTypes.badge.unlocked) {
      return {
        url: this.router.urlFor(
          'profile.achievements',
          this.recipient.get('id')
        ),
        iconUrl: '/images/badges-earned.png',
      };
    }

    return { url: undefined, svgIcon: '', iconUrl: '' };
  }
}
