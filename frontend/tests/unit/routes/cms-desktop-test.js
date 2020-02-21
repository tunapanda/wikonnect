import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cms-desktop', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cms-desktop');
    assert.ok(route);
  });
});
