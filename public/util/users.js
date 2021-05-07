const users = [];

const joinUser = (id, name, room) => {
  const u = { id, name, room };
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
