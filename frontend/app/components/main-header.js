import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';




export default class MainHeaderComponent extends Component {

  @service
  me;


  @service router;
  @service session;


  @tracked token = this.session.data.authenticated.token
  @tracked search_term;
  @tracked searchLoading = false;


  @action
  search() {
    this.searchLoading = true;
    this.router.transitionTo('search', this.search_term);
    this.searchLoading = false;

  }

  @action
  logoutuser() {

    this.me.logout();
    document.location.reload();

    this.router.transitionTo('home');


  }


}
