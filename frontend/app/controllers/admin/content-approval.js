import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AdminContentApprovalController extends Controller {
  @service store;
  @service me;

  @tracked feedback;
  @tracked sortBy = "name";
  @tracked searchTerm;

  @tracked statuses = [
    { name: 'approved', checked: true },
    { name: 'pending', checked: true },
    { name: 'revisions requested', checked: true },
  ];

  @action
  setSortBy(value) {
    this.sortBy = value;
    console.log(this.sortBy);
  }

  @action
  toggleSelection(index) {
    this.statuses[index].checked = !this.statuses[index].checked;
    this.statuses = [...this.statuses];
  }

  sortChapters(chapters) {
    if (!this.sortBy) {
      return chapters.sortBy('name');
    }

    if(this.sortBy === 'lastUpdateTime') {
      return chapters.sortBy(this.sortBy).reverse();
    }
    
    return chapters.sortBy(this.sortBy);
  }

  filterChapters(chapters) {
    return chapters.filter((chapter) => {
      const index = this.statuses.findIndex(
        (status) => status.name === chapter.approvalStatus
      );
      return this.statuses[index].checked;
    });
  }

  get chapters() {
    if (!this.searchTerm) {
      return this.sortChapters(this.filterChapters(this.model));
    }

    const filteredChapters = this.filterChapters(this.model);

    const searchResults = filteredChapters.filter((chapter) => {
      return chapter.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    return this.sortChapters(searchResults);
  }

  @action
  async toggleApproval(chapterId, choice) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      chapter.approved = choice;
      chapter.revisionRequested = false;
      await chapter.save();
    } catch (e) {
      chapter.approved = !choice;
    }
  }

  @action
  async requestRevision(chapterId) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      const model = this.store.createRecord('chapterFeedback', {
        comment: this.feedback,
        chapter: chapter,
        creator: this.me.user,
      });

      chapter.revisionRequested = true;
      await chapter.save();

      model
        .save()
        .then(() => {
          this.feedback = '';
        })
        .catch(() => {
          this.feedback = model.comment;
          model.deleteRecord();
        });
    } catch (e) {
      chapter.revisionRequested = false;
      await chapter.save();
    }
  }
}
