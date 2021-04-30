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
  @tracked searchLoading = false;
  @tracked searchQuery = '';

  color = Math.floor(Math.random() * 16777215).toString(16);

  get name() {
    return this.me.name;
  }

  @action
  async change(evt) {
    // TODO: implement searchLoading false and true setters
    this.searchQuery = evt;
  }

  get filterFunction() {
    // TODO: check code complexity of regex filter vs indexOf
    // c.name.match(new RegExp(params.id, 'i')) ||
    // c.description.match(new RegExp(params.id, 'i'))
    let c;
    if (this.searchQuery) {
      c = this.args.model.chapters.filter(
        (c) => c.name.indexOf(this.searchQuery) > -1
      );
    }
    return c;
  }

  @action
  translate(lang) {
    this.intl.setLocale([lang]);
  }
}
