import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';

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
    let mySet = new Set();

    this.args.theModel.map(x => {

      x.tags.map(y => {
        mySet.add(y);

      });
    });
    return mySet;

  }
}
