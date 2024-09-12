// Required modules
const WebSocket = require('ws');                 // WebSocket library for real-time communication
const mongoose = require('mongoose');            // Mongoose for MongoDB database interaction
const Message = require('./models/message');     // Message model for saving chats to MongoDB
const { replicate, openai } = require('./config/open-ai');  // Configurations for Replicate and OpenAI

// Connect to the database
mongoose.connect('mongodb://localhost:27017/openai-chatbot', {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

/**
 * WebSocket connection handler
 */
wss.on('connection', (ws) => {
    console.log('Client connected');

    /**
     * Message handler: When the client sends a message, this function will be triggered.
     */
    ws.on('message', async (message) => {
        console.log('Received message =>', message.toString());

        // Prepare user input for both OpenAI and Replicate
        const userInput = {
            prompt: message.toString(),
            max_tokens: 1024,
        };

        let output = "";

        try {
            // Decide whether to use OpenAI or Replicate based on environment settings
            if (process.env.OPENAI_API_KEY) {
                console.log('Using OpenAI API...');
                
                // If OpenAI API key is available, use OpenAI for generating the response
                const gptResponse = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: userInput.prompt }],
                });

                output = gptResponse.choices[0]?.message?.content || "No response from OpenAI";
                ws.send(output);  // Send the OpenAI response to the WebSocket client

            } else {
                console.log('Using Replicate API...');

                // If OpenAI API key is not available, use Replicate for generating the response
                for await (const chunk of replicate.stream("meta/meta-llama-3.1-405b-instruct", { input: userInput })) {
                    output += chunk.data;
                    ws.send(chunk.data);  // Send the Replicate output in real-time chunks
                }
            }

            // Save the input and output to the MongoDB database
            const newMessage = new Message({
                input: message.toString(),
                output: output,
            });
            await newMessage.save();
            console.log('Message saved to the database');

        } catch (error) {
            console.error('Error while processing the request:', error);
            ws.send('Error processing your request.');
        }
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
