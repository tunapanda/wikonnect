import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cms/module/create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cms/module/create');
    assert.ok(route);
  });
});
