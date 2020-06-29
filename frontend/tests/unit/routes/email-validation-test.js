import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | email-validation', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:email-validation');
    assert.ok(route);
  });
});
