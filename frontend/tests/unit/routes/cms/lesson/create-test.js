import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cms/lesson/create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cms/lesson/create');
    assert.ok(route);
  });
});
