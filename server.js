// imports
const path = require("path"); // built-in nodejs
const http = require("http"); // built-in express
const express = require("express");
const socket = require("socket.io");

// initialization
const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = 3000 || process.env.PORT;

// middleware
app.use(express.static(path.join(__dirname, "public"))); // set static folder to render html

// Listeners
io.on("connection", (socket) => {
  // run server when client connects
  socket.emit("message", "Welcome to the chatroom!"); // emit a message to newly connected client instance
  socket.broadcast.emit("message", "New user has entered the chatroom!"); // broadcast a message to client minus client instance
  // io.emit("", "") --> sends message to all instances

  // runs when client instance disconnects
  socket.on("disconnect", () => {
    io.emit("message", "User has left the chatroom.");
  });
});

// server

// app.listen(PORT, () => {
//   console.log(`Express Server Running: ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
