// main.js listens for client events to send server.js
const form = document.getElementById("chat-form");
const messages = document.getElementsByClassName("chat-messages");
const socket = io(); // socket.io script from chat.html

// message response from server
socket.on("message", (msg) => {
  console.log("message:", msg);
  renderMessage(msg);
  messages.scrollTop = messages.scrollHeight; // scroll down on new message
});

// add listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value; // get client instance message string
  console.log("message sent to server:", message);
  socket.emit("userMessage", message); // emit client instance message to the server
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
