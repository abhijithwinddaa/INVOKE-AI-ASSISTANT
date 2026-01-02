import express from "express";
import cors from "cors";
import { generate } from "./chatbot.js";

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welsocme to express server");
});

app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;
  // todo: add validation for message

  if (!message || !threadId) {
    return res.status(400).json({ error: "Message and threadId are required" });
  }

  console.log("Received message:", message);

  const result = await generate(message, threadId);
  res.json({ message: result });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
