import Component from '@glimmer/component';

export default class HomeFilterComponent extends Component {

  get results() {
    let {chapters, tagFilters} = this.args;
    if (tagFilters && tagFilters.length > 0) {
      return chapters.filter((chapter) => tagFilters.some((tag) => chapter.tags.includes(tag.name)));
    }
    return chapters;
  }
}
