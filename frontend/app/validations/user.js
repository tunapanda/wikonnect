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
    validateLength({ min: 4 })
  ],
  email: validateFormat({ type: 'email' }),
  password: [
    validatePresence(true),
    validateLength({ min: 8 })
    // validatePasswordStrength({ minScore: 80 })
  ],
  passwordConfirmation: validateConfirmation({ on: 'password' })
};