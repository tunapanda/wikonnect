const Notifications = require('../../models/notification');

module.exports = async function (data) {
  await Notifications.query().insert(data);
  return 0;
};
