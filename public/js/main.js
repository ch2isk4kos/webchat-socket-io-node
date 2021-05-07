// main.js listens for client events to send server.js
const form = document.getElementById("chat-form");
const socket = io(); // socket.io script from chat.html

// message from server
socket.on("message", (message) => {
  console.log("message:", message);
  renderMessage(message);
});

// add listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value; // get client instance message string
  console.log("message sent to server:", message);
  socket.emit("userMessage", message); // emit client instance message to the server
});

// display message to DOM
const renderMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta"></p>
    <p class="text">${message}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
};
