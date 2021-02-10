import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {A} from '@ember/array';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {ChapterFilterTag} from '../pojos/chapter-filter-tag';

export default class HomeController extends Controller {
  @service
  me;

  @tracked
  selectedFilterTags = A([]);


  get tagsList() {
    let allFilterTags = A([]);

    this.model.map(chapter => {
      chapter.tags.map(tag => {
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
      tag.checkBoxSelected = false;
    });
    this.selectedFilterTags.clear();
  }

  //event from button tags filters
  @action
  toggleTagSelection(tag) {

    if (tag.selected) {
      this.selectedFilterTags.removeObject(tag);
      //unselect the tag
      tag.selected = false;
      tag.checkBoxSelected = false;

    } else {
      this.selectedFilterTags.addObject(tag);
      tag.selected = true;
      tag.checkBoxSelected = true;

    }

  }

  //event from tag filters dropdown
  @action
  filterWithMultipleTags(selectedTags) {
    // sync any previous selection first
    const unselected = this.selectedFilterTags
      .filter(t => {
        if (t.checkBoxSelected === false) {
          t.selected = false; //2 birds 1 stone  😎
          return true;
        }
        return false;
      });

    this.selectedFilterTags.removeObjects(unselected);


    this.selectedFilterTags.addObjects(selectedTags);
    //in case there is unselected tag with checkbox checked
    this.selectedFilterTags.map((tag) => tag.selected = true);
  }
}
