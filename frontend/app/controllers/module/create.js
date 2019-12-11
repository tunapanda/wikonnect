import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ModuleCreateController extends Controller {

  selectedLesson = null;

  @computed('model.name')
  get moduleSlug() {
    return this.model.get('name').replace(/\s/g, "-");
  }

  @computed('model.modules.[]')
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
    model.setProperties({
      slug: this.get('moduleSlug'),
      status: "published"
    });
    model.save();
  }
}
