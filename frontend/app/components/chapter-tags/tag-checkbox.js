import Component from '@glimmer/component';

export default class ChapterTagsTagCheckboxComponent extends Component {
  get isSelected() {
    return (
      this.args.selectedTags &&
      this.args.selectedTags.findBy('id', this.args.tag.id)
    );
  }
}
