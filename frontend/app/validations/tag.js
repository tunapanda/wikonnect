import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  name: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateLength({ min: 2, max: 30 }),
    validateFormat({
      regex: /^[ \w_-]+$/, // should find a way to allow AT&T
      message: 'No special characters allowed',
    }),
  ],
};
