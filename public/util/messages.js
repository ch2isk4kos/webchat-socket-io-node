const moment = require("moment");

const formatMessage = (username, string) => {
  return {
    username: username,
    text: string,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;
