import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';

export default class LearnChaptersController extends Controller {
  queryParams = ['tags'];
  queryTagJoinXcter = ',';

  @service me;
  @service store;
  @service intl;
  @tracked tags = null;
  @tracked selectedFilterTags = A([]);

  get tagsList() {
    return this.store
      .peekAll('tag')
      .filter((tag) => tag.id) // ensure it has an id
      .sortBy('name');
  }

  @action
  preselectSelectedFilterTags() {
    if (!this.tags) {
      return;
    }
    const queryTags = this.tags.split(this.queryTagJoinXcter);

    this.tagsList.map((tag) => {
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
      if (index > -1) {
        this.selectedFilterTags.addObject(tag);
      }
    });
  }

  @action
  clearAllTagFilters() {
    this.selectedFilterTags.clear();
    this.tags = null;
    console.log(this.selectedFilterTags.length);
  }

  @action
  toggleTagSelection(tag) {
    const queryTags = this.tags ? this.tags.split(this.queryTagJoinXcter) : [];
    const obj = this.selectedFilterTags.findBy('id', tag.id);
    if (obj) {
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
      queryTags.splice(index, 1);

      this.selectedFilterTags.removeObject(obj);
    } else {
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
      if (index === -1) {
        queryTags.push(tag.id);
      }
      this.selectedFilterTags.addObject(tag);
    }

    this.tags = queryTags.join(this.queryTagJoinXcter);
  }

  get recordsLoadedText() {
    if (!this.tags && this.model.length === 0) {
      return this.intl.t('home.loading.no_content');
    }

    if (!this.tags || (this.model.length > 0 && this.tags)) {
      return this.intl.t('home.loading.loaded_all_the_records');
    }
    if (this.selectedFilterTags.length === 0) {
      return this.intl.t('home.loading.wrong_record_filters', {
        selectedTags: this.tags,
      });
    }
    const allTags = this.selectedFilterTags.compact();

    const lastTag = allTags.pop();

    if (allTags.length === 0) {
      return this.intl.t('home.loading.no_filtered_record', {
        selectedTag: lastTag.name,
      });
    }

    const selectedTags =
      allTags.mapBy('name').join(',') + ', and ' + lastTag.name;
    return this.intl.t('home.loading.no_filtered_records', { selectedTags });
  }
}
