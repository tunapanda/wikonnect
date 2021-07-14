import Route from '@ember/routing/route';

export default class ProfileCoursesIndexRoute extends Route {
  beforeModel() {
    return this.transitionTo('profile.courses.enrolled');
  }
}
