const input = document.querySelector("#input");
const chatContainer = document.querySelector("#chat-container");
const askbtn = document.querySelector("#ask");

const threadId =
  Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

input?.addEventListener("keyup", handleEnter);
askbtn?.addEventListener("click", handleAsk);

const loading = document.createElement("div");
loading.className = "my-6 animate-pulse";
loading.textContent = "Thinking...";

async function generateMessage(text, isUser) {
  const msg = document.createElement("div");
  if (isUser) {
    msg.className = "my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit";
  } else {
    msg.className = "my-6 bg-neutral-700 p-3 rounded-xl mr-auto max-w-fit";
  }
  msg.textContent = text;
  chatContainer?.appendChild(msg);
  input.value = "";

  chatContainer?.appendChild(loading);

  const assistantMessage = await callServer(text);

  const assistantMsgElem = document.createElement("div");
  assistantMsgElem.className = `max-w-fit`;
  assistantMsgElem.textContent = assistantMessage;
  loading.remove();
  chatContainer?.appendChild(assistantMsgElem);
}

async function callServer(inputText) {
  const response = await fetch("http://localhost:3002/chat", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ threadId, message: inputText }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.message;
}

async function handleAsk(e) {
  const text = input?.value.trim();
  if (!text) {
    return;
  }
  await generateMessage(text, true);
}

async function handleEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) {
      return;
    }
    await generateMessage(text, true);
  }
}
