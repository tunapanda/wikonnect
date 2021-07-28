
module.exports = function slugGen(postData) {
  return postData.replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-*|-*$/g, '')
    .toLowerCase();
};