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
  @tracked tagsList = this.parsedChapterTags;

  get parsedChapterTags() {
    return this.store
      .peekAll('tag')
      .filter((tag) => tag.id) // ensure it has an id
      .sortBy('name')
      .map((tag) => new FilterTag(tag, false));
  }

  get selectedFilterTags() {
    if (!this.tags) {
      return [];
    }
    const queryTags = this.tags.split(this.queryTagJoinXcter);
    return this.tagsList.filter((tag) => {
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
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
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
      if (index > -1) {
        queryTags.splice(index, 1);
      }
    } else {
      const index = queryTags.findIndex(
        (t) => t.toLowerCase() === tag.id.toLowerCase()
      );
      if (index === -1) {
        queryTags.push(tag.id);
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
    const allTagIds = this.tags.split(this.queryTagJoinXcter);
    const lastTagId = allTagIds.pop();
    const lastTag = this.tagsList.find((tag) => {
      return tag.id.toLowerCase() === lastTagId.toLowerCase();
    });

    if (allTagIds.length === 0) {
      return this.intl.t('home.loading.no_filtered_record', {
        selectedTag: lastTag ? lastTag.name : lastTagId,
      });
    }
    const allTagNames = this.tagsList
      .filter((t) => {
        return allTagIds.some((id) => id.toLowerCase() === t.id.toLowerCase());
      })
      .mapBy('name');

    let selectedTags = lastTag ? lastTag.name : lastTagId;
    if (allTagNames) {
      allTagNames.join(',') + ', and ' + lastTag.name;
    }
    return this.intl.t('home.loading.no_filtered_records', { selectedTags });
  }
}

class FilterTag {
  @tracked isSelected;
  constructor(tagModel, isSelected) {
    this.name = tagModel.name;
    this.id = tagModel.id;
    this.isSelected = isSelected;
  }
}
