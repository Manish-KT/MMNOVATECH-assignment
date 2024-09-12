# Real-Time WebSocket Chatbot with OpenAI and Replicate Meta-LLAMA

This project implements a real-time chatbot using WebSockets, with support for **OpenAI** and **Replicate Meta-LLAMA** language models. The application can generate responses using either OpenAI or Replicate based on the availability of an OpenAI API key.

## Project Structure

```bash
├── config                
│   └── open-ai.js        # Object creation using relevant LLMs (OpenAI/Replicate)
├── models
│   └── Message.js        # MongoDB schema for storing chats
├── .env                  # Environment variables (OpenAI API Key / Replicate Meta-LLAMA)
├── index.js              # Main WebSocket server
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Features
- **Real-time Chat**: Communicate with the bot in real time using WebSockets.
- **Dual Model Support**: Supports both **OpenAI** and **Replicate Meta-LLAMA**.
- **Fallback System**: If OpenAI API key is not available, the system will fallback to Replicate's Meta-LLAMA model.
- **MongoDB Integration**: Chat history is saved to a MongoDB database for persistence.
- **Streaming Support**: Real-time responses from Replicate's model streamed to the client.

## Setup Instructions

### Prerequisites
- Node.js (>=14.x)
- MongoDB
- Optional: OpenAI API Key

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-repo/websocket-llm-chatbot.git
cd websocket-llm-chatbot
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```bash
# OpenAI API Key (Optional)
OPENAI_API_KEY=your-openai-api-key-here

# Replicate API Token (Optional, needed for certain models)
REPLICATE_API_TOKEN=your-replicate-api-token-here

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/openai-chatbot
```

### Step 4: Start MongoDB
Ensure MongoDB is running locally:

```bash
mongod --dbpath /path/to/your/db
```

### Step 5: Start the WebSocket Server
Run the server:

```bash
node index.js
```

The server will start on `ws://localhost:8080`.

## Testing the WebSocket Server

1. **Using the WebSocket Client**:
    Run the WebSocket client script to test communication:
    ```bash
    node testing_replicate.js
    ```
    This script will connect to the WebSocket server, send a message, and print responses to the console.

2. **Using `wscat`**:
    Install `wscat` if you haven’t already:
    ```bash
    npm install -g wscat
    ```
    Connect to the WebSocket server using `wscat`:
    ```bash
    wscat -c ws://localhost:8080
    ```
    You can send messages and see responses directly in the terminal.

## Troubleshooting

- **`Error: Cannot find module 'openai'`**: Ensure you have installed the `openai` package. If using ESM, update your `open-ai.js` to use `import` statements correctly.
  
- **`WebSocket is not defined`**: Ensure you’re running WebSocket code in a browser environment or use the `ws` package for Node.js.

- **`ECONNREFUSED`**: Check that MongoDB and WebSocket server are running, and ensure the correct port is being used.

- **`wscat` issues**: Make sure the WebSocket server is running and accessible on the specified port.

## MongoDB Integration

The chat history, including both input and output, will be saved in the `openai-chatbot` MongoDB database. You can retrieve and analyze past chats as needed.

## OpenAI and Replicate Configuration

### OpenAI
To use OpenAI, ensure you have added your **OpenAI API Key** in the `.env` file:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

### Replicate Meta-LLAMA
If the OpenAI API key is missing or not set, the server will default to **Replicate Meta-LLAMA**. You can optionally add your **Replicate API Token** to the `.env` file if required:

```bash
REPLICATE_API_TOKEN=your-replicate-api-token-here
```

## File Descriptions

- **config/open-ai.js**: This file contains the configuration for OpenAI and Replicate. If the OpenAI API key is available, it will initialize OpenAI; otherwise, Replicate is initialized for Meta-LLAMA.
- **models/Message.js**: MongoDB schema for saving user input and generated output.
- **index.js**: The main WebSocket server that handles client connections, message processing, and calls to OpenAI or Replicate based on availability.
- **package.json**: Contains dependencies and scripts for the project.
- **.env**: Stores environment variables for OpenAI API key, Replicate API token, and MongoDB connection string.

## License
This project is licensed under the MIT License.
