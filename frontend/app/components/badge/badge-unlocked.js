import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { events } from '../../utils/socket-events';

export default class BadgeUnlockedComponent extends Component {
  @service socket;
  @service store;
  @service router;

  @tracked showBadgeUnlockedModal = false;
  @tracked badge;

  @action
  hideBadgeUnlockedModal() {
    this.showBadgeUnlockedModal = false;
  }

  @action
  notificationEventIntercept() {
    this.socket.socket.on(events.user.notification.created, (notification) => {
      setTimeout(async () => {
        if (!this.showBadgeUnlockedModal) {
          this.badge = await this.store.find('badge', notification.itemId);
          this.showBadgeUnlockedModal = true;
        }
      }, 3000);
    });
  }
}
