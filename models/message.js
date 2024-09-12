const mongoose = require('mongoose');

// Define the schema for storing messages
const messageSchema = new mongoose.Schema({
    input: { type: String, required: true },    // User input
    output: { type: String, required: true },   // Generated output (either from OpenAI or Replicate)
    timestamp: { type: Date, default: Date.now } // Timestamp when the message was created
});

module.exports = mongoose.model('Message', messageSchema);
