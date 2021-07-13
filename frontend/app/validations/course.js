import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';

export default {
  name: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateLength({ min: 2, max: 50 }),
  ],
  description: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateLength({ min: 2, max: 100 }),
  ],
};
