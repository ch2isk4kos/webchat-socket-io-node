const users = [];

const joinUser = (id, username, room) => {
  const u = { id, username, room };
  users.push(u);
  return u;
};

const getCurrentUser = (id) => {
  return users.find((u) => u.id === id);
};

module.exports = {
  joinUser,
  getCurrentUser,
};
