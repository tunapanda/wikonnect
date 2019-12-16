import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ModuleEditController extends Controller {

  selectedLesson = null;

  @computed('model.lessons.[]')
  get moduleLessons() {
    return this.model.get('lessons');
  }


  @computed()
  get allLessons() {
    return this.store.findAll('lesson');
  }


  @action
  addLesson(lesson) {
    this.model.get('lessons').pushObject(lesson);
    this.set('selectedLesson', null);
  }

  @action
  saveModule(model) {
    model.save();
  }
}
