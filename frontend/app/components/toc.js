import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class TocComponent extends Component {
  @action
  highlight(element) {
    const listItems = Array.from(element.children);
    const active = listItems.slice(0, this.args.page);
    active.forEach((li) => li.classList.add("active"));
  }
}
