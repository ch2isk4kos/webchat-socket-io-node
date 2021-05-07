const moment = require("moment");

const formatMessage = (username, message) => {
  return {
    username: username,
    message: message,
    time: moment.format("hour:minutes a"),
  };
};

module.exports = formatMessage;
