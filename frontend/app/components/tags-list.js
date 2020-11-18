import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// import { action } from '@ember/object';
// import { computed } from '@ember/object';

export default class TagsListComponent extends Component {
  @service
  me

  @service
  session;

  @service
  store;

  @service
  notify


  get tagsList() {
    let filtered = [];

    this.store.query('chapter', { 'approved': true }).then(t => {

      t.map(c => {

        filtered.concat(c.tags);
      });

    });



    return filtered;

  }
}
