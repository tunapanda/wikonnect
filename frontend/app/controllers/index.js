import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  queryParams = ['tags'];
  queryTagJoinXcter = ',';

  @service me;
  @service store;
  @service intl;
  @tracked tags = null;
  @tracked tagsList = this.store.peekAll('chapter-tag');

  get selectedFilterTags() {
    if (!this.tags) {
      return [];
    }
    const queryTags = this.tags.split(this.queryTagJoinXcter);
    return this.tagsList.filter((tag) => {
      const index = queryTags.findIndex((t) => t.toLowerCase() === tag.name);
      if (index > -1) {
        tag.isSelected = true;
        return true;
      }
      tag.isSelected = false;
      return false;
    });
  }

  @action
  clearAllTagFilters() {
    this.tagsList = this.tagsList.map((tag) => {
      tag.isSelected = false;
      return tag;
    });
    this.tags = null;
  }

  @action
  toggleTagSelection(tag) {
    const queryTags = this.tags ? this.tags.split(this.queryTagJoinXcter) : [];
    if (tag.isSelected) {
      const index = queryTags.findIndex((t) => t.toLowerCase() === tag.name);
      if (index > -1) {
        queryTags.splice(index, 1);
      }
    } else {
      const index = queryTags.findIndex((t) => t.toLowerCase() === tag.name);
      if (index === -1) {
        queryTags.push(tag.name);
      }
    }
    tag.isSelected = !tag.isSelected;

    this.tags = queryTags.join(this.queryTagJoinXcter);
  }

  get recordsLoadedText() {
    if (!this.tags && this.model.length === 0) {
      return this.intl.t('home.loading.no_content');
    }

    if (!this.tags || (this.model.length > 0 && this.tags)) {
      return this.intl.t('home.loading.loaded_all_the_records');
    }
    const allTags = this.tags.split(this.queryTagJoinXcter);
    const lastTag = allTags.pop();
    const selectedTags = allTags.join(',') + ', and ' + lastTag;

    return this.intl.t('home.loading.no_filtered_record', { selectedTags });
  }
}
