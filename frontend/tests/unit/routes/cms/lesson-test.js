import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cms/lesson', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cms/lesson');
    assert.ok(route);
  });
});
