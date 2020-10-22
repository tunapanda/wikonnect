import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tag', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tag');
    assert.ok(route);
  });
});
