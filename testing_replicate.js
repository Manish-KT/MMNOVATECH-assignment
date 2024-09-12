const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

let messageBuffer = '';

ws.on('open', () => {
    console.log('Connected to WebSocket server');
    ws.send('Hello, server!');
});

ws.on('message', (data) => {
    if (Buffer.isBuffer(data)) {
        // Convert Buffer to string and accumulate
        messageBuffer += data.toString();
    } else {
        messageBuffer += data;
    }

    // Handle complete message (assuming messages are separated by '\n' or '\r\n')
    if (messageBuffer.endsWith('\n') || messageBuffer.endsWith('\r\n')) {
        console.log('Complete message from server:', messageBuffer.trim());
        messageBuffer = ''; // Clear buffer after processing
    }
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

ws.on('close', () => {
    console.log('WebSocket connection closed');
});
