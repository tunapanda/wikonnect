import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teach/thumbnail-upload', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teach/thumbnail-upload');
    assert.ok(route);
  });
});
