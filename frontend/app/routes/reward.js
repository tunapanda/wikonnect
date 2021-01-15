import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'; // Just import the mixin

export default class RewardRoute extends Route.extend(AuthenticatedRouteMixin) {
  @inject
  me;

  @inject
  session;
}
