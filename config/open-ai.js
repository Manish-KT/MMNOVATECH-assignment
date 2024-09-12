// Use CommonJS 'require' syntax
const OpenAI = require('openai'); // OpenAI API library
const Replicate = require('replicate'); // Replicate library
require('dotenv').config(); // Load environment variables from .env file

// Initialize OpenAI API only if the API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

// Initialize Replicate API using the API token from .env file
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN, // Your Replicate API token
});

// Export both OpenAI and Replicate APIs
module.exports = { openai, replicate };
