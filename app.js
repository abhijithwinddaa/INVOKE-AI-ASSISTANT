import dotenv from "dotenv";
dotenv.config();

import readline from "node:readline/promises";
import OpenAI from "openai";
import { tavily } from "@tavily/core";
import { read } from "node:fs";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content: `You are a Chatify, a smart personal assistant.
           You have access to following tools:
           1. searchWeb({query}: {query: string}) // Search the latest information and real-time data from the internet.
           current date and time: ${new Date().toUTCString()}`,
    },
    // {
    //   role: "user",
    //   content: "what is current weather in hyderabad?",
    // },
  ];

  while (true) {
    const question = await rl.question("You: ");

    if (question === "bye") {
      break;
    }
    messages.push({ role: "user", content: question });

    while (true) {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: messages,
        tools: [
          {
            type: "function",
            function: {
              name: "webSearch",
              description:
                "Search the latest information and real-time data from the internet.",
              parameters: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description:
                      "The search query to look up information on the web.",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      messages.push(response.choices[0].message);

      const toolCall = response.choices[0].message.tool_calls;
      if (!toolCall) {
        console.log(`Assistant: ${response.choices[0].message.content}`);
        break;
      }

      for (const tool of toolCall) {
        // console.log(`Tool called: ${tool.name}`);
        const functionName = tool.function.name;
        const functionparams = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionparams));
          // console.log(`Tool result: ${toolResult}`);

          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
    }
  }

  rl.close();
}

main();

async function webSearch({ query }) {
  console.log(`Performing web search for query: ${query}`);

  const response = await tvly.search(query);

  // console.log(response);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}
