const path = require("path"); // built-in nodejs fn()
const express = require("express");
const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public"))); // set static folder - front end

app.listen(PORT, () => {
  console.log(`Express Server Running: ${PORT}`);
});
