import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { slugify } from '../../utils/slugify';
import tagValidations from '../../validations/tag';
import courseValidations from '../../validations/course';

export default class CourseCourseFormComponent extends Component {
  tagValidations = tagValidations;
  courseValidations = courseValidations;
  @service store;
  @service notify;
  @service intl;

  @tracked uploader;
  @tracked thumbnail;
  @tracked selectedTags = A([]);
  maxTagsTotal = 8;

  get model() {
    return this.args.model;
  }
  get tagModel() {
    return this.store.createRecord('tag');
  }

  get playlist() {
    return this.model.get('playlist');
  }

  get sortedCoursePlaylist() {
    return this.playlist.sortBy('rank');
  }
  get hasPlaylist() {
    return this.playlist && this.playlist.length > 0;
  }

  get allTags() {
    if (!this.args.tags) {
      return [];
    }
    return this.args.tags;
  }

  get predefinedSelectableTags() {
    return this.allTags
      .filter((tag) => {
        return (
          tag.id && !this.courseTags.findBy('id', tag.id) && !tag.canDelete
        );
      })
      .sortBy('name')
      .reverse();
  }

  get courseTags() {
    return this.model.get('tags');
  }
  get courseHasTags() {
    return this.courseTags && this.courseTags.length > 0;
  }

  get selectedCourseImageSrc() {
    if (this.thumbnail) {
      return URL.createObjectURL(this.thumbnail);
    }
    if (this.model.thumbnailUrl) {
      return this.model.thumbnailUrl;
    }
    return '';
  }

  @action
  onFilesSelect(files) {
    if (files.length > 1) {
      this.notify.error('You can only upload one file');
    } else if (files[0].size > 15 * 1024 * 1024) {
      this.notify.error(
        this.intl.t('course.errors.max_tags_selected', { max: '15MB' })
      );
    } else {
      this.thumbnail = files[0];
    }
  }

  @action
  selectPredefinedTag(tag) {
    if (this.courseTags.length >= this.maxTagsTotal) {
      this.notify.alert(
        this.intl.t('errors.max_tags_selected', { max: this.maxTagsTotal })
      );
      return;
    }
    this.courseTags.addObject(tag);
  }

  @action
  unselectCourseTag(tag) {
    this.courseTags.removeObject(tag);
  }

  @action
  async addCustomTag(model) {
    if (this.courseTags.length >= this.maxTagsTotal) {
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
      if (!this.courseTags.findBy('id', obj.id)) {
        this.courseTags.addObject(obj);
      }
      model.rollback();
      return true;
    }
    try {
      model.name = model.name.trim();
      const result = await model.save();
      this.courseTags.addObject(result);
    } catch (e) {
      this.notify.alert(this.intl.t('course.errors.submit_tag'));
    }
  }

  @action
  addChapterToPlaylist(chapter) {
    if (this.model.get('playlist').findBy('id', chapter.id)) {
      this.notify.alert(this.intl.t('course.errors.chapter_on_playlist'));
      return;
    }

    chapter.rank = this.model.get('playlist').length;
    this.model.get('playlist').addObject(chapter);
  }

  @action
  reorderChapterToPlaylist(oldIndex, incrementBy) {
    if (oldIndex === 0 && incrementBy === -1) {
      return; //no action needed
    }
    const max = this.playlist.length;
    if (oldIndex === max && incrementBy === 1) {
      return; //no action needed
    }
    const newIndex = oldIndex + incrementBy;

    const playlistCopy = this.playlist.compact();

    const item = playlistCopy.objectAt(oldIndex);
    playlistCopy.removeAt(oldIndex); //remove the playlist item
    const joinedItems = [
      ...playlistCopy.slice(0, newIndex),
      item,
      ...playlistCopy.slice(newIndex),
    ];
    const reorderedItems = joinedItems.map((item, index) => {
      item.rank = index;
      return item;
    });
    this.playlist.clear();
    this.playlist.addObjects(reorderedItems);
  }

  @action
  removePlaylistItem(item) {
    const obj = this.playlist.findBy('id', item.id);
    if (obj) {
      this.playlist.removeObject(obj);
      //we could reorder the playlist to fill the gap but there is no consequence
    }
  }

  get canPublish() {
    return this.playlist && this.playlist.length > 0;
  }

  @action
  beforeSubmit(form, model, published) {
    model.status = published ? 'published' : 'draft';
    form.submit();
  }

  @action
  submitForm(model) {
    if (this.args.onFormSubmit) {
      this.args.onFormSubmit({
        model,
        thumbnail: this.thumbnail,
      });
    }
  }
}
