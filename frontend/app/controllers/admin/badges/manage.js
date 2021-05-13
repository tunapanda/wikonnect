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
}
