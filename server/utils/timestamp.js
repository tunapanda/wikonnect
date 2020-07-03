const User = require('../models/user');

async function lastSeen(userId) {

  let lastSeen = new Date().toISOString();

  try {
    await User.query().patchAndFetchById(userId, { 'last_seen': lastSeen });
  } catch (e) {
    console.log(e);
  }
}

async function updatedAt(){
  return new Date().toISOString();
}

module.exports = {
  lastSeen,
  updatedAt
};
