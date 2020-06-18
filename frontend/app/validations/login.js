import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  username: [
    validateFormat({ regex: "[a-zA-Z0-9_-]*", message: 'You need to agree on Terms!'}),
    validatePresence(true),
    validateLength({ min: 4 })
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 8 })
  ],
};