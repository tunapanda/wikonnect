import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { load } from '../helpers/load';

export default class MainHeaderComponent extends Component {
  @service me;
  @service router;
  @service session;
  @service intl;
  @service config;
  @tracked token = this.session.data.authenticated.token;
  @tracked searchQuery = '';

  color = Math.floor(Math.random() * 16777215).toString(16);

  get name() {
    return this.me.name;
  }

  @action
  async change(evt) {
    this.searchQuery = evt;
  }

  get filterFunction() {
    let url = `/api/v1/search/chapter?q=${this.searchQuery}`;
    return load(fetch(url).then((data) => data.json()));
  }

  @action
  translate(lang) {
    this.intl.setLocale([lang]);
  }
}
