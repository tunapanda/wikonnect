import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { inject } from '@ember/service';

export default class CmsDesktopController extends Controller {

  createCourseModal = false;
  createModuleModal = false;
  selectedCourse;
  selectedModule;
  selectedLesson;

  @inject
  me;

  @computed('name')
  get courseSlug() {
    return "slug";
    //return this.get('name').replace(/\s/g, "-");
  }

  get coursemodel() {
    return this.store.createRecord('course', {
      creator: this.me.get('user')
    });
  }



  @action
  toggleCourseModal() {
    this.toggleProperty('createCourseModal');

  }

  @action
  toggleModuleModal() {
    this.toggleProperty('createModuleModal');

  }

  @action
  async selectCourse(course_slug) {
    this.set("selectedModule", null);
    this.set("selectedLesson", null);


    console.log("slug");
    console.log(course_slug);
    let _selectedCourse = await this.store.findBySlug('course', course_slug);
    console.log(_selectedCourse);
    this.set("selectedCourse", _selectedCourse);

  }

  @action
  async selectModule(module_slug) {
    this.set("selectedLesson", null);
    let _selectedModule = await this.store.findBySlug('module', module_slug);
    this.set("selectedModule", _selectedModule);

  }

  @action
  saveCourse(model) {
    model.setProperties({
      slug: this.get('courseSlug'),
      status: "published"
    });
    model.save();
  }

  @action
  async selectLesson(lesson_slug) {
    let _selectedLesson = await this.store.findBySlug('lesson', lesson_slug);
    this.set("selectedLesson", _selectedLesson);

  }




  @computed()
  get allCourses() {
    return this.store.findAll('course');
  }



  @action
  submit() {
    console.log();
    // this.get('Modal').open('plain');
  }

  @action
  close() {
    console.log();
  }

}
