import { module, test } from 'qunit';
import validateCrossField from 'wikonnect/validators/cross-field';

module('Unit | Validator | cross-field');

test('it exists', function (assert) {
  assert.ok(validateCrossField());
});
