import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Uploader from '../../utils/uploader';
import { A } from '@ember/array';

export default class CourseCreateController extends Controller {
  @service store;
  @service notify;
  @service router;
  @service intl;
  @tracked courseForm;
  @tracked fileUploader;
  @tracked chapterSearchTerm;
  @tracked selectedFilterTags = A([]);

  get courseModel() {
    return this.store.createRecord('course', {
      status: 'draft',
    });
  }

  get filterTags() {
    return this.store
      .peekAll('tag')
      .filter((tag) => tag.id)
      .sortBy('name');
  }

  filterChaptersByStatus(chapters) {
    return chapters.filter((chapter) => chapter.approved && chapter.id);
  }

  filterChaptersBySearch(chapters) {
    if (!this.chapterSearchTerm) {
      return chapters;
    }
    return chapters.filter((chapter) => {
      return (
        chapter.name.toLowerCase().includes(this.chapterSearchTerm) ||
        chapter.author.name.toLowerCase().includes(this.chapterSearchTerm) ||
        chapter.description.toLowerCase().includes(this.chapterSearchTerm)
      );
    });
  }

  filterChaptersByTags(chapters) {
    if (this.selectedFilterTags.length === 0) {
      return chapters;
    }
    return chapters.filter((chapter) => {
      if (chapter.get('tags').length === 0) {
        return false;
      }
      const chapterTags = chapter.get('tags').toArray();

      const index = this.selectedFilterTags.findIndex((ft) => {
        return chapterTags.some((ct) => ct.id === ft.id);
      });
      return index > -1;
    });
  }

  get filteredChapters() {
    const chapters = this.store.peekAll('chapter');
    return this.filterChaptersByTags(
      this.filterChaptersBySearch(this.filterChaptersByStatus(chapters))
    );
  }

  @action
  setCourseForm(form) {
    this.courseForm = form;
  }

  @action
  addChapterToCourse(chapter) {
    if (!this.courseForm || !this.courseForm.addChapter) {
      this.notify.alert('It seems we are facing issue with course playlist');
      return 1;
    }
    this.courseForm.addChapter(chapter);
  }

  @action
  removeChapterFromCourse(chapter) {
    if (!this.courseForm || !this.courseForm.addChapter) {
      this.notify.alert('It seems we are facing issue with course playlist');
      return 1;
    }
    this.courseForm.removeChapter(chapter);
  }

  @action
  isChapterOnCoursePlaylist(chapter) {
    return (
      this.courseForm &&
      this.courseForm.playlist &&
      this.courseForm.playlist.findBy('id', chapter.id)
    );
  }

  @action
  async createCourse({ model, thumbnail }) {
    let result;
    try {
      //save course details
      result = await model.save();
      if (!thumbnail) {
        if (result.status === 'draft') {
          this.notify.success(
            this.intl.t('course.create_page.labels.draft_saved')
          );
          this.router.transitionTo('course.drafts');
        } else {
          this.notify.success(
            this.intl.t('course.create_page.labels.published_no_image')
          );
          this.router.transitionTo('course.published');
        }
      }
    } catch (e) {
      this.notify.alert(this.intl.t('course.errors.course_submission'), {
        closeAfter: 100000,
      });
    }
    //upload course image
    if (thumbnail && result && result.id) {
      this.fileUploader = Uploader.create({
        file: thumbnail,
        filename: thumbnail.name,
      });
      try {
        const url =
          this.store
            .adapterFor('courses')
            .urlForUpdateRecord(result.id, 'courses') + '/thumbnail';

        await this.fileUploader.startUpload(url);

        if (result.status === 'draft') {
          this.notify.success(
            this.intl.t('course.create_page.labels.draft_saved')
          );
          this.router.transitionTo('course.drafts');
        } else {
          this.notify.success(
            this.intl.t('course.create_page.labels.published_with_image')
          );
          this.router.transitionTo('course.published');
        }
      } catch (e) {
        this.notify.alert(this.intl.t('course.errors.course_image_upload'), {
          closeAfter: 100000,
        });
      }
    }
  }

  @action
  toggleFilterTagSelection(tag) {
    const obj = this.selectedFilterTags.findBy('id', tag.id);
    if (obj) {
      this.selectedFilterTags.removeObject(obj);
    } else {
      this.selectedFilterTags.addObject(tag);
    }
  }

  @action
  clearAllTagFilters() {
    this.selectedFilterTags.clear();
  }

  get noChaptersLoadedText() {
    if (this.store.peekAll('chapter').length === 0) {
      return this.intl.t('course.errors.no_content');
    }
    if (this.selectedFilterTags.length > 0 && this.chapterSearchTerm) {
      const obj = this.selectedFilterTags.compact();
      const last = obj.pop();
      let selectedTags = last.name;

      if (obj.length > 0) {
        selectedTags = obj.mapBy('name').join(',') + `, and ` + last.name;
      }

      return this.intl.t('course.errors.no_search_filtered_record', {
        word: this.chapterSearchTerm,
        selectedTags,
      });
    }
    if (this.chapterSearchTerm) {
      return this.intl.t('course.errors.no_searched_record', {
        word: this.chapterSearchTerm,
      });
    }
    if (this.selectedFilterTags.length === 1) {
      return this.intl.t('course.errors.no_filtered_record', {
        selectedTag: this.selectedFilterTags.objectAt(0).name,
      });
    }
    if (this.selectedFilterTags.length > 1) {
      const obj = this.selectedFilterTags.compact();
      const last = obj.pop();
      const selectedTags = obj.mapBy('name').join(',') + `, and ` + last.name;
      return this.intl.t('course.errors.no_filtered_records', { selectedTags });
    }
    return this.intl.t('course.errors.content_display_error');
  }
}
