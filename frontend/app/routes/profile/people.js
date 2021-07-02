import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfilePeopleRoute extends Route {
  @service me;
  @service infinity;

  model() {
    return this.infinity.model('user', {
      include: 'userfollowees',
      followerId: this.me.id,
      aggregate: 'userFollowers,enrolledCourses,followedTags',
      perPage: 10,
      startingPage: 0,
    });
  }
}
