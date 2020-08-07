import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class RewardRoute extends Route {
  @inject
  me;

  @inject
  session;
}
