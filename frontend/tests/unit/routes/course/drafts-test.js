import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | course/drafts', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:course/drafts');
    assert.ok(route);
  });
});
