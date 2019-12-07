import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { all } from 'rsvp';

export default class CmsLessonCreateController extends Controller {
  @inject
  me;

  @action
  async submit() {
    await this.model.save();

    all(this.model.chapters.invoke('save'));

    this.transitionToRoute('cms.lesson.edit', this.model);
  }

  @action
  addChapter() {
    const chapter = this.store.createRecord('chapter', {
      creator: this.me.user,
      lesson: this.model,
      status: 'published'
    });

    this.get('model.chapters').pushObject(chapter);
  }

  @action
  removeChapter(chapter) {
    this.get('model.chapters').removeObject(chapter);
    chapter.destroy();
  }
}
