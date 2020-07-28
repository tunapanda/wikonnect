const badWordsArray = require('badwords/array');

module.exports = async function profaneCheck(comment) {
  const reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const badWordsRE = new RegExp(badWordsArray.map(reEscape).join('|'));
  return comment.match(badWordsRE);
};
