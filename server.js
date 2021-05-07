// imports
const path = require("path"); // built-in nodejs
const http = require("http"); // built-in express
const express = require("express");
const socket = require("socket.io");

// client import utility functions
const formatMessage = require("./public/util/messages");

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
  socket.emit("message", formatMessage("Chatbot", "Welcome to the chatroom!")); // emits a message to newly connected client instance
  socket.broadcast.emit(
    "message",
    formatMessage("Chatbot", "USER has entered the chatroom!")
  ); // broadcasts a message to all instances minus client instance
  // io.emit("", "") --> sends message to client

  // runs when client instance disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage("Chatbot", `USER has left the chatroom.`));
  });

  // listen for user message submission
  socket.on("userMessage", (message) => {
    console.log("user message received:", message);
    io.emit("message", formatMessage("USER", message)); // emit user message to client
  });
});

// server

// app.listen(PORT, () => {
//   console.log(`Express Server Running: ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
