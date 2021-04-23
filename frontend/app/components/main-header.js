import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { log } from '../utils/logger';

export default class MainHeaderComponent extends Component {
  @service me;
  @service router;
  @service session;
  @service intl;
  @service config;
  @tracked token = this.session.data.authenticated.token;
  @tracked search_term;
  @tracked searchLoading = false;
  @tracked searchQuery = '';

  @action
  search(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.searchLoading = true;
    this.router.transitionTo('search', this.search_term);
    this.searchLoading = false;
  }

  get name() {
    return this.me.name;
  }

  @action
  async change(evt) {
    // TODO: implement searchLoading false and true setters
    this.searchQuery = evt;
  }

  get filterFunction() {
    // TODO: check code complexity of regex filter vs indexOf
    // c.name.match(new RegExp(params.id, 'i')) ||
    // c.description.match(new RegExp(params.id, 'i'))
    let c;
    if (this.searchQuery) {
      c = this.args.model.chapters.filter(
        (c) => c.name.indexOf(this.searchQuery) > -1
      );
    }
    return c;
  }

  @action
  translate(lang) {
    this.intl.setLocale([lang]);
  }

  get unreadNotificationsCount() {
    if (!this.args.model.notifications) {
      return 0;
    }
    return this.args.model.notifications.filter((n) => n.read === false).length;
  }

  @action
  async onNotificationSelect(model, dropdown) {
    if (model.read === true) {
      if (model.route) {
        this.router.transitionTo(model.route, model.itemId);
      }
      dropdown.closeDropdown();
      return;
    }
    //update the notification status as read
    try {
      model.read = true;
      await model.save();

      dropdown.closeDropdown();

      if (model.route) {
        this.router.transitionTo(model.route, model.itemId);
      }
    } catch (e) {
      log.error('Notifications', e);
    }
  }

  @action
  async deleteNotification(model) {
    try {
      await model.destroyRecord();
    } catch (e) {
      log.error('Notifications', e);
    }
  }

  @action
  async toggleNotificationStatus(model) {
    try {
      model.read = !model.read;
      await model.save();
    } catch (e) {
      log.error('Notifications', e);
    }
  }
}
