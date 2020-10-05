import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teach/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teach/index');
    assert.ok(route);
  });
});
