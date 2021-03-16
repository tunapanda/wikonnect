import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { ChapterFilterTag } from '../utils/chapter-filter-tag';

export default class HomeController extends Controller {
  @service
  me;

  @tracked
  selectedFilterTags = A([]);

  get chapters() {
    if (this.selectedFilterTags.length > 0) {
      return this.model.filter((chapter) =>
        this.selectedFilterTags.some((tag) => chapter.tags.includes(tag.name))
      );
    }
    return this.model;
  }

  get tagsList() {
    let allFilterTags = A([]);

    this.model.map((chapter) => {
      chapter.tags.map((tag) => {
        let obj = new ChapterFilterTag(tag);
        allFilterTags.addObject(obj);
      });
    });
    return allFilterTags.uniqBy('name');
  }

  @action
  clearAllTagFilters() {
    this.selectedFilterTags.map((tag) => {
      tag.selected = false;
    });
    this.selectedFilterTags.clear();
  }

  @action
  toggleTagSelection(tag) {
    if (tag.selected) {
      this.selectedFilterTags.removeObject(tag);
    } else {
      this.selectedFilterTags.addObject(tag);
    }
    tag.selected = !tag.selected;
  }
}
