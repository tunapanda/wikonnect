import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class MainHeaderComponent extends Component {

  @service
  me;


  @service router;
  @service session;
  @service intl;
  @service config;


  @tracked token = this.session.data.authenticated.token
  @tracked search_term;
  @tracked searchLoading = false;


  @action
  search() {
    this.searchLoading = true;
    this.router.transitionTo('search', this.search_term);
    this.searchLoading = false;

  }

  @computed('me.user.{firstName,lastName}')
  get name() {
    if (this.me.user.metadata.firstName && this.me.user.metadata.lastName) {
      return `${this.me.user.metadata.firstName} ${this.me.user.metadata.lastName}`;
    }
    else if (this.me.user.metadata.firstName && !this.me.user.metadata.lastName) {
      return this.me.user.metadata.firstName;
    }
    else if (!this.me.user.metadata.firstName && this.me.user.metadata.lastName) {
      return this.me.user.metadata.lastName;
    }
    else {
      return this.me.user.username;
    }
  }


  @action
  translate(lang) {
    this.intl.setLocale([lang]);
  }
}
