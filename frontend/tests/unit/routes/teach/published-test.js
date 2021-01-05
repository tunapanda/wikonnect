import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teach/published', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teach/published');
    assert.ok(route);
  });
});
