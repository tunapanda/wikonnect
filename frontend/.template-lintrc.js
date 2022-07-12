'use strict';

const {
  DEFAULT_CONFIG,
} = require('ember-template-lint/lib/rules/no-bare-strings');
const additionalCharsToIgnore = [
  '#',
  'Creative Commons CC-BY 2019-2021 Wikonnect',
  '×',
  '·',
  '&middot;',
  '&times;',
];

module.exports = {
  extends: 'octane',
  ignore: ['app/templates/privacy'],
  rules: {
    'no-bare-strings': [
      ...DEFAULT_CONFIG.allowlist,
      ...additionalCharsToIgnore,
    ],
  },
};
