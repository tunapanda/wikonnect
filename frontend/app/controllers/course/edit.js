import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class CourseEditController extends Controller {

  selectedModule = null;

  @computed('model.modules.[]')
  get courseModules() {
    return this.model.get('modules');
  }


  @computed()
  get allModules() {
    return this.store.findAll('module');
  }


  @action
  addModule(mod) {
    this.model.get('modules').pushObject(mod);
    this.set('selectedModule', null);
  }

  @action
  saveCourse(model) {
    model.save();
  }
}


