import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';
export default {
  triggerId: [validatePresence({ presence: true })],
  points: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateNumber({ positive: true }),
  ],
  name: [validatePresence({ presence: true, ignoreBlank: true })],
  description: [validatePresence({ presence: true, ignoreBlank: true })],
  expiry: [validatePresence({ presence: true, ignoreBlank: true })],
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
