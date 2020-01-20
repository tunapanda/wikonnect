import Controller from '@ember/controller';
import { action } from '@ember/object';
// import { inject } from '@ember/service';

export default class CmsDesktopController extends Controller {

  createCourseModal = false;
  createModuleModal = false;




  @action
  toggleCourseModal() {
    this.toggleProperty('createCourseModal');

  }

  @action
  toggleModuleModal() {
    this.toggleProperty('createModuleModal');

  }


  @action
  submit() {
    console.log();
    // this.get('Modal').open('plain');
  }

  @action
  close() {
    console.log();
    // this.get('Modal').open('plain');
  }

}
