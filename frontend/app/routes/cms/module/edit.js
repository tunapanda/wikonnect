import Route from '@ember/routing/route';

export default class CmsModuleEditRoute extends Route {

  model(params) {
    return this.store.findBySlug('module', params.module_slug);
  }

}
