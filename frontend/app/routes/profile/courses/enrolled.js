import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileCoursesEnrolledRoute extends Route {
  @service me;
}
