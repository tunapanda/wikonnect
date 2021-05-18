import { module, test } from 'qunit';
import validateDate from 'wikonnect/validators/date';

module('Unit | Validator | date');

test('it exists', function(assert) {
  assert.ok(validateDate());
});
