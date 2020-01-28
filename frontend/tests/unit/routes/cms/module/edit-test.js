import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cms/module/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cms/module/edit');
    assert.ok(route);
  });
});
