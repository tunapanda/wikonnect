import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  username: [
    validatePresence(true),
    validateLength({ min: 4 }),
    validateFormat({ regex: "[a-zA-Z0-9_-]*"})
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 8 })
  ],
};