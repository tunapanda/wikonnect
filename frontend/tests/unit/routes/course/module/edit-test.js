import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | course/module/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:course/module/edit');
    assert.ok(route);
  });
});
