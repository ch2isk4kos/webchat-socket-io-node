const path = require("path"); // built-in nodejs
const http = require("http"); // built-in express
const express = require("express");

const app = express();
const server = http.createServer(app);

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public"))); // set static folder to render html

// app.listen(PORT, () => {
//   console.log(`Express Server Running: ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
