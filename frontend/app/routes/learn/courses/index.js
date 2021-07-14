import Route from '@ember/routing/route';

export default class LearnCoursesIndexRoute extends Route {
  beforeModel() {
    this.transitionTo('learn.courses.available');
  }
}
