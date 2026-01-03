# Chatify - AI Chatbot with Web Search & Memory

A **lightweight, production-ready web chatbot** powered by Groq's Llama 3.3 70B LLM with real-time web search capabilities and conversation memory.

---

## 🎯 Quick Overview

**What It Does:**

- 💬 **Smart Chat** - Talk to an AI assistant (Llama 3.3 70B)
- 🌐 **Web Search** - Get real-time information from the internet
- 🧠 **Memory** - Remembers your conversation context (24 hours)
- 🎭 **Multiple Personas** - Switch AI behavior (Coder, Teacher, Debugger, etc.)
- 💻 **Web Interface** - Modern dark-themed chat UI
- ⚡ **Fast & Free** - Groq LLM is completely free

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [API Keys & Configuration](#api-keys--configuration)
6. [Project Structure](#project-structure)
7. [How to Use](#how-to-use)
8. [How It Works](#how-it-works)
9. [API Endpoints](#api-endpoints)
10. [Troubleshooting](#troubleshooting)
11. [Advanced Usage](#advanced-usage)

---

## 🌟 Features

✅ **Smart AI Assistant**

- Groq's Llama 3.3 70B model (free & fast)
- Natural language understanding
- Context-aware responses
- Tool calling support

✅ **Real-Time Web Search**

- Powered by Tavily
- Fresh, latest information
- Fallback for unknown topics
- Combines search results with AI

✅ **Conversation Management**

- Multi-turn conversations
- Thread-based sessions (unique ID per conversation)
- 24-hour memory cache
- Context preservation across messages

✅ **Intelligent Personas**

- General Assistant (default)
- Coder (clean code, algorithms)
- Teacher (step-by-step, examples)
- Debugger (identify → explain → fix)
- Architect (design, scalability)
- Researcher (accurate, sourced)

✅ **Modern Web UI**

- Dark theme (Tailwind CSS)
- Responsive design
- Real-time message updates
- Clean, intuitive interface

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CHATIFY SYSTEM                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                 FRONTEND (Web Browser)                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │ • Chat Interface (Dark theme, Tailwind CSS)        │    │
│  │ • Message Input & Display                          │    │
│  │ • Real-time Updates                                │    │
│  │ • Session Management                               │    │
│  └────────────────────────────────────────────────────┘    │
│                      ↓ (HTTP)                                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│            EXPRESS.JS SERVER (Port 3002)                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Route: POST /chat                                  │    │
│  │ Route: GET  /                                      │    │
│  └────────────────────────────────────────────────────┘    │
│                      ↓                                       │
├─────────────────────────────────────────────────────────────┤
│                  MESSAGE PROCESSING                          │
│                                                               │
│  Input: User Message                                        │
│  ↓                                                           │
│  [Check for web search need]                                │
│  ↓                                                           │
│  [Retrieve conversation history from cache]                 │
│  ↓                                                           │
│  [Prepare prompt with context]                              │
│  ↓                                                           │
│  [Send to LLM with tool definitions]                        │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                   BACKEND MODULES                             │
│                                                               │
│  ┌──────────────────────────────────┐  ┌────────────────┐  │
│  │  Groq LLM Module                 │  │ Web Search     │  │
│  │                                  │  │ (Tavily)       │  │
│  │ • Message processing             │  │                │  │
│  │ • Tool calling                   │  │ • Real-time    │  │
│  │ • Response generation            │  │   search       │  │
│  │ • Context handling               │  │ • Fresh data   │  │
│  └──────────────────────────────────┘  └────────────────┘  │
│           ↓                          ↓                       │
│  ┌──────────────────────────────────────────────────┐       │
│  │      Memory Module (NodeCache)                   │       │
│  │  • Thread-based storage                         │       │
│  │  • 24-hour TTL                                  │       │
│  │  • Conversation history per session             │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                    Response to User
```

### Tech Stack

| Component      | Technology                      | Purpose                |
| -------------- | ------------------------------- | ---------------------- |
| **Frontend**   | HTML5, Vanilla JS, Tailwind CSS | User interface         |
| **Backend**    | Node.js, Express.js v5          | API server             |
| **LLM**        | Groq (Llama 3.3 70B)            | AI response generation |
| **Web Search** | Tavily                          | Real-time information  |
| **Memory**     | node-cache                      | Conversation history   |
| **CORS**       | cors middleware                 | Cross-origin requests  |

---

## 📋 Prerequisites

Before starting, ensure you have:

### Required Software

- **Node.js** v18 or higher ([Download](https://nodejs.org))
- **npm** (comes with Node.js)
- **A modern web browser** (Chrome, Firefox, Safari, Edge)

### Required API Keys (Free Tier Available)

1. **Groq API Key** (LLM - Completely Free)
2. **Tavily API Key** (Web Search - Free tier available)

---

## ⚙️ Installation

### Step 1: Navigate to Project

```bash
cd "f:\FullStack Projects\invoke"
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:

```json
{
  "@tavily/core": "^0.6.3", // Web search API
  "cors": "^2.8.5", // Cross-origin resource sharing
  "dotenv": "^17.2.3", // Environment variables
  "express": "^5.2.1", // Web framework
  "node-cache": "^5.1.2", // In-memory caching
  "openai": "^6.15.0" // OpenAI SDK (Groq compatible)
}
```

### Step 3: Verify Installation

```bash
npm list
```

Should show no errors.

---

## 🔑 API Keys & Configuration

### 1️⃣ **Groq API Key** (LLM Provider - FREE)

**What it does**: Powers the AI responses using Llama 3.3 70B model (completely free with no rate limits)

**How to get it:**

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up / Login with email
3. Click "API Keys" in the left sidebar
4. Click "Create New API Key"
5. Copy the full key (looks like: `gsk_xxxxxxxxxxxxx`)

**In `.env`:**

```dotenv
GROQ_API_KEY=gsk_your_key_here
```

✅ **Cost**: FREE  
✅ **Speed**: ~50-100ms response time  
✅ **Model**: Llama 3.3 70B (most capable free model)

**Test your key:**

```bash
node -e "console.log(process.env.GROQ_API_KEY)"
```

Should display your key (not "undefined").

---

### 2️⃣ **Tavily API Key** (Web Search - FREE)

**What it does**: Real-time web search for latest information, news, and current data

**How to get it:**

1. Visit [tavily.com](https://tavily.com)
2. Sign up / Login
3. Go to "API Keys" in dashboard
4. Copy your API key

**In `.env`:**

```dotenv
TAVILY_API_KEY=tvly-your_key_here
```

✅ **Cost**: FREE (generous free tier)  
✅ **Features**: Real-time search, news, web results  
✅ **Speed**: ~1-2 seconds per search

**Test your key:**

```bash
node -e "console.log(process.env.TAVILY_API_KEY)"
```

---

### Complete `.env` File

Create a file named `.env` in the project root:

```dotenv
# ================================
# GROQ LLM (AI Responses) - FREE
# ================================
GROQ_API_KEY=gsk_your_groq_key_here

# ================================
# TAVILY (Web Search) - FREE
# ================================
TAVILY_API_KEY=tvly-your_tavily_key_here

# ================================
# DEBUG (Optional)
# ================================
DEBUG=true
NODE_ENV=development
```

⚠️ **IMPORTANT**: Add `.env` to `.gitignore` to never commit your keys!

```bash
# Add to .gitignore
echo ".env" >> .gitignore
```

---

## 📁 Project Structure

```
invoke/
├── package.json              # Dependencies & scripts
├── .env                      # API keys (⚠️ NEVER commit!)
├── .gitignore               # Git ignore rules
├── README.md                # This file
│
├── server.js                # Main Express server & API endpoints
├── chatbot.js               # LLM logic & web search integration
├── app.js                   # CLI version (optional, standalone)
│
├── frontend/
│   ├── index.html           # Chat user interface
│   └── script.js            # Frontend JavaScript logic
│
└── node_modules/            # Dependencies (auto-created)
```

### File Descriptions

| File                    | Purpose                | Key Functions                                            |
| ----------------------- | ---------------------- | -------------------------------------------------------- |
| **server.js**           | Express API server     | Handles `/chat` endpoint, serves frontend                |
| **chatbot.js**          | Core AI logic          | Generates responses, handles web search, manages context |
| **app.js**              | CLI chatbot (optional) | Standalone terminal-based chat (not used by web UI)      |
| **frontend/index.html** | Chat UI                | Dark theme interface, message display, input area        |
| **frontend/script.js**  | Frontend logic         | API communication, message handling, UI updates          |
| **.env**                | Configuration          | Store API keys (NOT in Git)                              |

---

## 🚀 How to Use

### Step 1: Start the Server

```bash
node server.js
```

You should see:

```
Server is running on port: 3002
```

### Step 2: Open in Browser

Navigate to:

```
http://localhost:3002
```

The chat interface should load.

### Step 3: Start Chatting

#### Example 1: Simple Question

```
You: "What is the capital of France?"
Chatify: "The capital of France is Paris..."
```

#### Example 2: Current Information

```
You: "What's the latest news about AI?"
Chatify: [Searches web, then responds with latest info]
```

#### Example 3: Coding Help

```
You: "@coder How do I reverse a JavaScript array?"
Chatify: [Switches to Coder persona, explains with code examples]
```

### Step 4: How Messages Work

1. **Type message** → Click "Send" or press Enter+Shift
2. **Message sent** to server with unique `threadId`
3. **Server processes**:
   - Retrieves conversation history from cache
   - Decides if web search needed
   - Calls LLM with context
   - Returns response
4. **Response displayed** → Message appears in chat

---

## 🧠 How It Works

### Complete Message Flow

```
USER TYPES MESSAGE
        ↓
[Message appears in chat UI]
        ↓
[JavaScript sends to server]
        ↓
SERVER: POST /chat
        ↓
[Extract: message + threadId]
        ↓
[Retrieve conversation history from cache]
        ↓
[If not cached: create new thread]
        ↓
SMART DECISION:
├─ Question about current/recent events?
│  → Call web search (Tavily)
│  → Get latest results
│
├─ Question about knowledge/explanation?
│  → Skip web search
│  → Use LLM directly
│
└─ Ambiguous?
   → Let LLM decide if it needs search
   → Tool calling capability
        ↓
PREPARE LLM REQUEST:
├─ System prompt: Chatify instructions
├─ Conversation history: Previous messages
├─ Current message: User input
├─ Tool definitions: Web search tool
└─ Settings: temperature=0, model=llama-3.3-70b
        ↓
CALL GROQ LLM
        ↓
LLM DECIDES:
├─ Responds directly → Send to user
└─ Calls web search tool → Execute search
        ↓
IF WEB SEARCH CALLED:
├─ Call Tavily API
├─ Get search results
├─ Add to context
├─ Call LLM again with results
└─ Get final response
        ↓
CACHE RESPONSE:
├─ Store in NodeCache
├─ TTL: 24 hours
└─ Key: threadId + messages
        ↓
FORMAT RESPONSE:
├─ Extract text content
├─ Add metadata
└─ Send to frontend
        ↓
FRONTEND DISPLAYS:
├─ Assistant message in chat
├─ Styled response
└─ Ready for next message
```

### Conversation Memory (Cache)

**How it works:**

- Each conversation has unique `threadId`
- Generated on frontend: `Date.now().toString(36) + Math.random()`
- All messages stored in NodeCache in memory
- 24-hour TTL (automatically deleted after 24 hours)
- If you refresh browser, same threadId = continues conversation

**Example:**

```javascript
// Frontend generates threadId
threadId = "1yd3v5k7p2q9"; // Example

// Server stores:
cache[threadId] = [
  { role: "user", content: "Hello" },
  { role: "assistant", content: "Hi! How can I help?" },
  { role: "user", content: "What's 2+2?" },
  { role: "assistant", content: "2+2 equals 4" },
];

// Next message uses same threadId → has full history
```

### Persona System

The system has predefined personas. You can mention them:

```
You: "@teacher Explain quantum mechanics"
→ System switches to Teacher mode
→ Gives step-by-step explanation with examples

You: "@coder How to optimize this function?"
→ System switches to Coder mode
→ Focuses on performance, clean code, algorithms
```

**Available Personas:**

- `@general` - Default assistant
- `@coder` - Coding expert
- `@teacher` - Educational mode
- `@debugger` - Problem solver
- `@architect` - Design & scalability
- `@researcher` - Accurate, sourced info

---

## 🔌 API Endpoints

### 1. POST `/chat` - Send Message

**Request:**

```json
{
  "message": "What's the weather today?",
  "threadId": "1yd3v5k7p2q9"
}
```

**Response:**

```json
{
  "message": "I don't have access to real-time weather data, but I can help you find weather information. What location would you like to know about?"
}
```

**Parameters:**

- `message` (string, required): User's question/message
- `threadId` (string, required): Unique conversation ID

**Returns:**

- `message` (string): AI-generated response

**Error Response:**

```json
{
  "error": "Message and threadId are required"
}
```

---

### 2. GET `/` - Load Frontend

**Request:**

```
GET http://localhost:3002/
```

**Response:**

- Returns `frontend/index.html` (the chat UI)

---

## 📊 Response Examples

### Example 1: Web Search (Tavily)

```
User: "Who won the 2025 World Cup?"
↓
[Server detects current event question]
↓
[Calls Tavily API → gets latest results]
↓
Response: "As of the latest reports, [current info]..."
```

### Example 2: Knowledge Question

```
User: "Explain photosynthesis"
↓
[Server determines no web search needed]
↓
[Calls Groq LLM directly]
↓
Response: "Photosynthesis is the process by which plants convert light energy into chemical energy..."
```

### Example 3: Coding Question with Persona

```
User: "@coder How to implement binary search in Python?"
↓
[Server detects @coder persona]
↓
[Calls LLM with "Coder" system prompt]
↓
Response:
```

def binary_search(arr, target): # Clean, well-commented code # Explanation of time complexity

```

```

---

## ❌ Troubleshooting

### Error: "GROQ_API_KEY is undefined"

**Cause:** `.env` file not found or key not set

**Solution:**

1. Create `.env` file in project root
2. Add: `GROQ_API_KEY=gsk_your_key`
3. Restart server: `node server.js`
4. Check logs for confirmation

**Verify:**

```bash
node -e "require('dotenv').config(); console.log(process.env.GROQ_API_KEY)"
```

---

### Error: "Cannot find module 'express'"

**Cause:** Dependencies not installed

**Solution:**

```bash
npm install
```

Then restart server.

---

### Error: "Port 3002 already in use"

**Cause:** Another process using same port

**Solution (Windows PowerShell):**

```powershell
# Find process on port 3002
netstat -ano | findstr :3002

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port in server.js:
# const port = 3003;
```

---

### Error: "TAVILY_API_KEY is undefined" (when searching)

**Cause:** Tavily key missing

**Solution:**

1. Add to `.env`: `TAVILY_API_KEY=tvly_your_key`
2. Restart server
3. Test web search functionality

---

### Server starts but frontend won't load

**Cause:** Frontend files not found

**Solution:**

1. Check `frontend/index.html` exists
2. Check `frontend/script.js` exists
3. Verify file paths in `server.js`

---

### Messages not sending

**Cause:** API error or network issue

**Solution:**

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab → `POST /chat` request
4. Verify `.env` keys are valid
5. Check server logs

---

### Slow responses

**Cause:** Network, API, or large context

**Solution:**

- Check internet connection
- First response slower than subsequent ones (normal)
- Clear cache if very large conversation
- Restart server

---

## 🔧 Advanced Usage

### Change LLM Model

Edit `chatbot.js`:

```javascript
// Current model: Llama 3.3 70B
model: "llama-3.3-70b-versatile";

// Alternative Groq models:
model: "llama2-70b-4096"; // Older, smaller
model: "mixtral-8x7b-32768"; // Mixture of experts
```

---

### Customize System Prompt

Edit `chatbot.js` - modify the system message:

```javascript
const baseMessages = [
  {
    role: "system",
    content: `You are Chatify, a custom assistant.
      
      YOUR CUSTOM RULES HERE:
      - Always be professional
      - Focus on accuracy
      - Cite sources when relevant
      - Keep answers concise
    `,
  },
];
```

---

### Adjust Cache TTL

Edit `chatbot.js`:

```javascript
// Current: 24 hours
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

// Change to 1 hour:
const cache = new NodeCache({ stdTTL: 60 * 60 });

// Change to 7 days:
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 7 });
```

---

### Enable Debug Logging

Edit `.env`:

```dotenv
DEBUG=true
```

Edit `server.js` - add logging:

```javascript
if (process.env.DEBUG) {
  console.log("Received message:", message);
  console.log("ThreadId:", threadId);
  console.log("Cache hit:", cache.has(threadId));
}
```

---

### Use CLI Version Instead

```bash
node app.js
```

Features:

- Terminal-based chat
- `/bye` to exit
- Same LLM and web search
- Type `/bye` to quit

---

## 📊 Performance Metrics

| Operation       | Time   | Notes               |
| --------------- | ------ | ------------------- |
| Simple answer   | 1-2s   | No web search       |
| With web search | 2-4s   | Tavily search + LLM |
| Cache hit       | <500ms | Instant from memory |
| First response  | ~3-5s  | Model warming up    |

---

## 🔐 Security Best Practices

1. **Never commit `.env`** - Always use `.gitignore`
2. **Use environment variables** - Never hardcode keys
3. **Rotate API keys regularly** - Every 3 months
4. **Keep dependencies updated** - `npm update`
5. **Use HTTPS in production** - Never HTTP
6. **Rate limit endpoints** - Prevent API abuse
7. **Validate user input** - Check message length
8. **Don't expose errors** - Hide API details

---

## 📈 Cost Breakdown

| Service            | Cost     | Notes                      |
| ------------------ | -------- | -------------------------- |
| Groq LLM           | **FREE** | Completely free, no limits |
| Tavily Search      | **FREE** | Generous free tier         |
| Hosting (if cloud) | Varies   | Depends on provider        |
| **Total**          | **FREE** | Zero cost to run           |

---

## 🗓️ Future Enhancements

Potential features to add:

- [ ] User authentication & profiles
- [ ] Persistent database (MongoDB/PostgreSQL)
- [ ] PDF document upload & RAG
- [ ] Message rating & feedback
- [ ] Conversation export (PDF/TXT)
- [ ] Advanced search filtering
- [ ] Real-time typing indicators
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Analytics dashboard

---

## 📞 Support

For issues:

1. Check [Troubleshooting](#troubleshooting)
2. Verify API keys in `.env`
3. Check server logs: `node server.js`
4. Test with `node -e "require('dotenv').config(); console.log(process.env)"`
5. Check Node.js version: `node --version` (need v18+)

---

## 📄 License

ISC

---

## 🙏 Credits

Built with:

- [Groq](https://groq.com) - Free LLM API (Llama 3.3 70B)
- [Tavily](https://tavily.com) - Web search API
- [Express.js](https://expressjs.com) - Web framework
- [Tailwind CSS](https://tailwindcss.com) - UI styling
- [Node.js](https://nodejs.org) - Runtime

---

**Happy Chatting! 🤖**

Last Updated: January 3, 2026
