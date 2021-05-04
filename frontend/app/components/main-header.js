import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MainHeaderComponent extends Component {
  @service me;
  @service router;
  @service session;
  @service intl;
  @service config;
  @tracked token = this.session.data.authenticated.token;
  @tracked search_term;
  @tracked searchLoading = false;

  @action
  search(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.searchLoading = true;
    this.router.transitionTo('search', this.search_term);
    this.searchLoading = false;
  }

  get name() {
    return this.me.name;
  }

  @action
  translate(lang) {
    this.intl.setLocale([lang]);
  }
}
