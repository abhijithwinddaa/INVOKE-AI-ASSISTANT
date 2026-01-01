const input = document.querySelector("#input");
const chatContainer = document.querySelector("#chat-container");
const askbtn = document.querySelector("#ask");
console.log("Script loaded");

input?.addEventListener("keyup", handleEnter);
askbtn?.addEventListener("click", handleAsk);

function generateMessage(text, isUser) {
  const msg = document.createElement("div");
  if (isUser) {
    msg.className = "my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit";
  } else {
    msg.className = "my-6 bg-neutral-700 p-3 rounded-xl mr-auto max-w-fit";
  }
  msg.textContent = text;
  chatContainer?.appendChild(msg);
}

function handleAsk(e) {
  const text = input?.value.trim();
  if (!text) {
    return;
  }
  generateMessage(text, true);
  input.value = "";
}

function handleEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) {
      return;
    }
    generateMessage(text, true);
    input.value = "";
  }
}
