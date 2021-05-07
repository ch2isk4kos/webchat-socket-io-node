const users = [];

const joinUser = (id, name, room) => {
  const u = { id, name, room };
  users.push(u);
  return u;
};

module.exports = joinUser;
