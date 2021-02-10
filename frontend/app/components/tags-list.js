import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {A} from '@ember/array';
import {action} from '@ember/object';

export default class TagsListComponent extends Component {

  @tracked
  dropdownSelectedTags = A([]);


  get hasSelectedFilterTags() {
    return this.args.selectedFilterTags.length > 0;
  }

  get disableApplyFiltersButton() {
    return this.dropdownSelectedTags.length === 0;
  }

  @action
  toggleCheckBoxSelection(tag) {

    if (tag.checkBoxSelected) {
      this.dropdownSelectedTags.removeObject(tag);
    } else {
      this.dropdownSelectedTags.addObject(tag);
    }
  }

  @action
  clearDropdownSelectedFilterTags() {
    this.dropdownSelectedTags.clear();
    // propagate the changes up to  parent
    this.args.clearAllTagFilters();
  }

  @action
  applyMultipleFilters() {
    this.args.filterWithMultipleTags(this.dropdownSelectedTags);
    this.dropdownSelectedTags.clear();

  }
}
