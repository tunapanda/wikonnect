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
      console.log("t")
      console.log(t)
      t.map(c => {
        console.log(c)
        console.log(tags)
        filtered.concat(c.tags)
      });

    });

    console.log("filtered")
    console.log(filtered)

    return filtered;

  }
}
