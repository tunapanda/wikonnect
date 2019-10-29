import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class IndexRoute extends Route {

    @inject
    me;

}
