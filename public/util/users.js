const users = [];

// client instance
const joinUser = (id, username, room) => {
  const u = { id, username, room };
  users.push(u);
  return u;
};

// client instance
const getCurrentUser = (id) => {
  return users.find((u) => u.id === id);
};

// client instance
const disconnectUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) return users.splice(index, 1);
};

// pool
const getPoolFromRoom = (room) => {
  return users.filter((u) => u.room === room);
};

module.exports = {
  joinUser,
  getCurrentUser,
  disconnectUser,
  getPoolFromRoom,
};
