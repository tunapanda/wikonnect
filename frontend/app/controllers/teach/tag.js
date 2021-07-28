import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import tagValidations from '../../validations/tag';
import { slugify } from '../../utils/slugify';

export default class TeachTagController extends Controller {
  tagValidations = tagValidations;

  @service me;
  @service config;
  @service intl;
  @service notify;

  maxTagsTotal = 4;
  //
  @tracked selectedTags = A([]);

  get modelParsedTags() {
    if (this.model.tags) {
      return this.model.tags;
    }
    return [];
  }

  get tagModel() {
    return this.store.createRecord('tag');
  }

  get allTags() {
    return this.store.peekAll('tag');
  }

  get predefinedSelectableTags() {
    return this.allTags
      .filter((tag) => {
        return (
          tag.id && !this.selectedTags.findBy('id', tag.id) && !tag.canDelete
        ); //don't return already selected tags
      })
      .sortBy('name')
      .reverse();
  }

  get hasUnselectedPredefinedTags() {
    return this.predefinedSelectableTags.length > 0;
  }

  @action
  preloadExistingChapterTags() {
    if (this.modelParsedTags) {
      this.selectedTags = A(this.modelParsedTags);
    }
  }

  @action
  selectPredefinedTag(tag) {
    if (this.selectedTags.length >= this.maxTagsTotal) {
      this.notify.alert(
        this.intl.t('errors.max_tags_selected', { max: this.maxTagsTotal })
      );
      return;
    }
    this.selectedTags.addObject(tag);
  }

  @action
  async addCustomTag(model) {
    if (this.selectedTags.length >= this.maxTagsTotal) {
      this.notify.alert(
        this.intl.t('errors.max_tags_selected', { max: this.maxTagsTotal })
      );
      return;
    }
    model.slug = slugify(model.name.trim());
    //check if it exist on tags available from backend
    const obj = this.allTags.findBy('slug', model.slug);
    if (obj) {
      //check if the tag has already been added
      if (!this.selectedTags.findBy('id', obj.id)) {
        this.selectedTags.addObject(obj);
      }
      model.rollback();
      return;
    }
    model.name = model.name.trim();
    try {
      const result = await model.save();
      model.rollback();
      this.selectedTags.addObject(result);
    } catch (e) {
      this.notify.error(this.intl.t('teach.tag.error_creating_tag'));
    }
  }

  @action
  unselectTag(tag) {
    this.selectedTags.removeObject(tag);
  }

  @action
  async updateTags() {
    try {
      let chapter = await this.store.peekRecord('chapter', this.model.id);
      chapter.tags = this.selectedTags;
      await chapter.save();
      //reset the local tags holder
      this.selectedTags = A([]);
      this.transitionToRoute('teach.review-questions', this.model.id);
    } catch (e) {
      this.notify.error(this.intl.t('teach.tag.error_updating_chapter_tags'));
    }
  }
}
