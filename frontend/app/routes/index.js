import Route from '@ember/routing/route';
import { inject, inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class IndexRoute extends Route {

    @inject
    me;

    @service
    headData;

    async afterModel() {
      set(this, 'headData.title', 'Wikonnect - Home');
      set(this, 'headData.theme', '#534897');
    }

}
