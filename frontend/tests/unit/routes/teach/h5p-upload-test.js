import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teach/h5p-upload', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teach/h5p-upload');
    assert.ok(route);
  });
});
