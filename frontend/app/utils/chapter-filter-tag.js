import {tracked} from '@glimmer/tracking';

export class ChapterFilterTag {
  @tracked name;
  @tracked checkBoxSelected;
  @tracked selected;

  constructor(name, selected = false, checkBoxSelected = false) {
    this.selected = selected;
    this.checkBoxSelected = checkBoxSelected;
    this.name = name;
  }
}
