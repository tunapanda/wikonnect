import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class HomeRoute extends Route {

  @inject
  me;

  model() {
    console.log(this.me.user.enrolledCourses.length);
    return this.me.user.enrolledCourses;
  }
}
