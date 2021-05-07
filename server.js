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

// run server when client connects
io.on("connection", (socket) => {
  console.log("New websocket connected");
});

// server

// app.listen(PORT, () => {
//   console.log(`Express Server Running: ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
