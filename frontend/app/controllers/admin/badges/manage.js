import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdminBadgesManageController extends Controller {
  queryParams = ['editItem'];

  @service store;

  @tracked createFormVisible = true;
  @tracked selectedBadgeModel;
  @tracked editItem = null;
  @tracked showBadgePopup = false;
  @tracked badgeForPopup;

  get badgeModel() {
    if (this.editItem) {
      const obj = this.model.find((badge) => badge.id === this.editItem);
      if (obj) {
        return obj;
      }
      return this.store.createRecord('badge', {
        trigger: '',
        name: 'KOya',
        points: 1000,
      });
    }
    return this.selectedBadgeModel;
  }

  @action
  toggleCreateFormVisibility() {
    this.createFormVisible = !this.createFormVisible;
  }

  @action
  initBadgeForm(badge) {
    this.editItem = badge.id;
    this.selectedBadgeModel = badge;
    this.createFormVisible = true;
  }

  @action
  async deleteBadge(badge) {
    if (window.confirm('Are you sure you want to delete the badge?')) {
      await badge.destroyRecord();
    }
  }

  @action
  async updatePublishStatus(badge) {
    const prompt = badge.published ? 'unpublish' : 'publish';
    if (window.confirm(`Are you sure you want to ${prompt} the badge?`)) {
      badge.published = !badge.published;
      await badge.save();
    }
  }

  @action
  viewBadgeOnPopup(badge) {
    this.badgeForPopup = badge;
    this.showBadgePopup = true;
  }
  @action badgePopupClosed() {
    this.showBadgePopup = false;
  }
}
