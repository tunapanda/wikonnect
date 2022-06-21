import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LeaderboardController extends Controller {
  @tracked showPerPage = 20;
  @tracked currentPage = 1;

  perPageOptions = [
    { value: 20, selected: true },
    { value: 50, selected: false },
    { value: 100, selected: false },
  ];

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
