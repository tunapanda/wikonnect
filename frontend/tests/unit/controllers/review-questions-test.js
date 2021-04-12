import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | review-questions', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:review-questions');
    assert.ok(controller);
  });
});
