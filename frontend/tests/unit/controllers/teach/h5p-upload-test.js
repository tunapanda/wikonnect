import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | teach/h5p-upload', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:teach/h5p-upload');
    assert.ok(controller);
  });
});
