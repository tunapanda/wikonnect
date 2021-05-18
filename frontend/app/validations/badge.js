import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';
import validateDate from '../validators/date';

export default {
  triggerId: [validatePresence({ presence: true })],
  points: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateNumber({ positive: true }),
  ],
  name: [validatePresence({ presence: true, ignoreBlank: true })],
  description: [validatePresence({ presence: true, ignoreBlank: true })],
  expiry: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateDate({
      after: new Date(),
      message: 'The date must be after today',
    }),
  ],
  frequency: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateNumber({ positive: true }),
  ],
  reminder: [
    validatePresence({ presence: true, ignoreBlank: true, on: 'frequency' }),
    validateNumber({ positive: true }),
  ],
  reminderMessage: [validatePresence(true)],
};
