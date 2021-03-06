// main.js listens for client events to send server.js
const form = document.getElementById("chat-form");
const messages = document.getElementsByClassName("chat-messages");
const roomName = document.getElementById("room-name");
const pool = document.getElementById("users");
const socket = io(); // socket.io script from chat.html

// url query -> username && chatroom
const { username, room } = Qs.parse(location.search, {
  // avoids special characters in the url query
  ignoreQueryPrefix: true,
});

console.log(username, room);

// join chatroom
socket.emit("join", { username, room });

// get pool from room
socket.on("userPool", ({ room, users }) => {
  renderRoomName(room);
  renderRoomPool(users);
});

// render message response from server
socket.on("message", (msg) => {
  console.log("message:", msg);
  renderMessage(msg);
  messages.scrollTop = messages.scrollHeight;
});

// add listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value;
  console.log("message sent to server:", message);
  socket.emit("userMessage", message);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// display message to DOM
const renderMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
};

// display user pool to DOM
const renderRoomName = (name) => {
  roomName.innerText = name;
};

// display user pool to DOM
const renderRoomPool = (users) => {
  pool.innerHTML = `${users
    .map(
      (u) => `
    <li>${u.username}</li>
    `
    )
    .join("")}`;
};
