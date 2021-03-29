'use strict';

const {
  DEFAULT_CONFIG,
} = require('ember-template-lint/lib/rules/no-bare-strings');
const additionalCharsToIgnore = ['#', '&middot;', '&times;'];

module.exports = {
  extends: 'octane',
  rules: {
    'no-bare-strings': [
      ...DEFAULT_CONFIG.allowlist,
      ...additionalCharsToIgnore,
    ],
  },
};
