// custom username using alphabet lowercase letters only
// ~17 thousand years needed, in order to have a 1 % probability of at least one collision.
const { customAlphabet } = require('nanoid/async');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 17);

module.exports = {
  customAlphabet, nanoid
};