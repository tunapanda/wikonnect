import {
  validatePresence,
  validateLength,
  validateFormat,
  validateConfirmation,
} from 'ember-changeset-validations/validators';
// validatePasswordStrength,

export default {
  username: [
    validatePresence(true),
    validateLength({ min: 4 }),
    validateFormat({
      regex: /^[a-zA-Z0-9_-]+$/,
      message: 'No special characters allowed',
    }),
  ],
  email: validateFormat({ type: 'email' }),
  contactNumber: [
    validatePresence(true),
    validateFormat({
      regex: /^(254|0)([7][0-9]|[1][0-1]){1}[0-9]{1}[0-9]{6}$/,
    }),
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 8 }),
    // validatePasswordStrength({ minScore: 80 })
  ],
  passwordConfirmation: validateConfirmation({ on: 'password' }),
  dataConfirmation: validatePresence({
    presence: true,
    message: 'Please confirm that we can use your data',
  }),
};
