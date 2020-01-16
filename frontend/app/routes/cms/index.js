import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class CmsIndexRoute extends Route {
  @inject
  me
}
