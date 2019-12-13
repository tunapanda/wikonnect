import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | course/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:course/edit');
    assert.ok(route);
  });
});
