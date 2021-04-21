import Service, { inject as service } from '@ember/service';
import { io } from 'socket.io-client';
import { eventCodes } from '../utils/events-classification';

export default class SocketService extends Service {
  @service session;
  @service me;
  @service store;
  @service infinity;

  socket = io({
    auth: { token: this.session?.data?.authenticated?.token },
  });

  eventHandlers() {
    /**
     *On approved chapter deletion, sync with chapter comments..
     */
    this.socket.on(eventCodes.chapterComment.created, (comment) => {
      setTimeout(async () => {
        const obj = await this.store.peekRecord('comment', comment.id);
        if (!obj) {
          this.store.pushPayload({ comment: comment });
        }
      }, 3000);
    });
  }

  /**
   * called when user role changes (on app visit, login, or logout)
   *  TODO: role modification(not implemented) event by admin should be pushed from the server (also not implemented)
   */
  roleChanged() {
    this.socket.emit(eventCodes.user.roleChange, {
      id: this.me?.user?.id,
      token: this.session?.data?.authenticated?.token,
    });
  }
}
