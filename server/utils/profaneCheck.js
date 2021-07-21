const Filter = require('bad-words');

module.exports = async function profaneCheck(comment) {
  const filter = new Filter();
  return filter.isProfane(comment);
};
