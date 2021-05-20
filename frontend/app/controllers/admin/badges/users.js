import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AdminBadgesUsersController extends Controller {
  @service me;
  @service store;
  @tracked userSearchTerm;
  @tracked showPerPage = 10;
  @tracked currentPage = 1;

  perPageOptions = [
    { value: 5, selected: false },
    { value: 10, selected: true },
    { value: 20, selected: false },
    { value: 50, selected: false },
    { value: 100, selected: false },
  ];

  get badges() {
    return this.store.peekAll('badge');
  }

  get badgesUnlockedCount() {
    return 0; //TODO
  }

  @action
  updatePerPage(evt) {
    this.currentPage = 1; // It's easier than doing calculations.
    this.showPerPage = +evt.target.selectedOptions[0].value;
  }

  get pageNumericSummary() {
    const recordsCount = this.model.length;

    let firstIndex = 1;
    if (this.currentPage > 1) {
      firstIndex = this.showPerPage * this.currentPage - (this.showPerPage - 1);
    }

    let lastIndex = this.showPerPage * this.currentPage;
    if (lastIndex > recordsCount) {
      lastIndex = recordsCount;
    }

    return { firstIndex, lastIndex, recordsCount };
  }

  get paginationSummary() {
    const {
      recordsCount,
      firstIndex: pageFirstIndex,
      lastIndex: pageLastIndex,
    } = this.pageNumericSummary;

    if (recordsCount <= this.showPerPage) {
      return `Showing All Users`;
    }

    return `Showing ${pageFirstIndex} - ${pageLastIndex} of ${recordsCount}`;
  }

  @action
  goToPrevPage() {
    if (this.hasPreviousPage) {
      this.currentPage = --this.currentPage;
    }
  }

  @action
  goToNextPage() {
    if (this.hasNextPage) {
      this.currentPage = ++this.currentPage;
    }
  }

  get hasNextPage() {
    const { recordsCount, lastIndex } = this.pageNumericSummary;
    return lastIndex !== recordsCount;
  }

  get hasPreviousPage() {
    const { recordsCount } = this.pageNumericSummary;
    return this.currentPage > 1 && recordsCount > this.showPerPage;
  }
}
