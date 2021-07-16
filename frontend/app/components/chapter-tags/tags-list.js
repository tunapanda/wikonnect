import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TagsListComponent extends Component {
  @tracked
  filterTagsSearchTerm;

  get hasSelectedFilterTags() {
    return this.args.selectedFilterTags.length > 0;
  }

  get filterTags() {
    const { tagsList } = this.args;

    if (!this.filterTagsSearchTerm) {
      return tagsList;
    }
    const search = new RegExp(this.filterTagsSearchTerm, 'i');
    return tagsList.filter((tag) => {
      return tag.name.search(search) > -1;
    });
  }

  get totalDefaultTags() {
    return this.filterTags.filter((tag) => tag.canDelete === false).length;
  }
}
