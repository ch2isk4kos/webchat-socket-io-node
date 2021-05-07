// imports
const path = require("path"); // built-in nodejs
const http = require("http"); // built-in express
const express = require("express");
const socket = require("socket.io");

// client import utility functions
const formatMessage = require("./public/util/messages");
const { joinUser, getCurrentUser } = require("./public/util/users");
const { join } = require("path");

// initialization
const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = 3000 || process.env.PORT;

// middleware
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  // run when client instance joins chatroom
  socket.on("join", ({ username, room }) => {
    const u = joinUser(socket.id, username, room);

    socket.join(u.room);

    socket.emit(
      "message",
      formatMessage("Chatbot", `Welcome to the ${u.room} chatroom!`)
    );
    socket.broadcast
      .to(u.room)
      .emit(
        "message",
        formatMessage("Chatbot", `${u.username} has entered the chatroom!`)
      );
  });

  // listens for user message submission
  socket.on("userMessage", (message) => {
    const u = getCurrentUser(socket.id);
    io.to(u.room).emit("message", formatMessage(`${u.username}`, message));
  });

  // runs when client instance disconnects
  socket.on("disconnect", () => {
    const u = getCurrentUser(socket.id);
    io.to(u.room).emit(
      "message",
      formatMessage("Chatbot", `${u.username} has left the chatroom.`)
    );
  });
});

// server

// app.listen(PORT, () => {
//   console.log(`Express Server Running: ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
