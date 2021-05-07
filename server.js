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
app.use(express.static(path.join(__dirname, "public"))); // set static folder to render html

io.on("connection", (socket) => {
  // run when client instance joins chatroom
  socket.on("join", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage("Chatbot", `Welcome to the ${room} chatroom!`)
    ); // emits a message to newly connected client instance
    socket.broadcast.emit(
      "message",
      formatMessage("Chatbot", `${username} has entered the chatroom!`)
    ); // broadcasts a message to all instances minus client instance
    // io.emit("", "") --> sends message to client
  });

  // listens for user message submission
  socket.on("userMessage", (message) => {
    console.log(`${username} message received:`, message);
    io.emit("message", formatMessage(`${username}`, message)); // emit user message to client
  });

  // runs when client instance disconnects
  socket.on("disconnect", () => {
    io.emit(
      "message",
      formatMessage("Chatbot", `${username} has left the chatroom.`)
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
