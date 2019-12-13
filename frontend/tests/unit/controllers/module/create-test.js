import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | module/create', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:module/create');
    assert.ok(controller);
  });
});
