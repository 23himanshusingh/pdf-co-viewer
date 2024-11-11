const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = {};
let adminId = null;

wss.on('connection', (ws) => {
  const userId = uuidv4();
  clients[userId] = ws;

  if (!adminId) {
    adminId = userId; // First connected user becomes admin
    console.log(`User  ${userId} is the admin`);
  } else {
    console.log(`User  ${userId} connected as viewer`);
  }

  // Notify all clients about the new connection
  broadcast(JSON.stringify({ type: 'userevent', message: `${userId} joined the chat`, admin: userId === adminId }));

  ws.on('message', (message) => {
    console.log(`Received message from ${userId}: ${message}`);
    const data = JSON.parse(message);

    // Only allow admin to send messages
    if (userId === adminId) {
      if (data.type === 'pageChange') {
        broadcast(JSON.stringify({ type: 'pageChange', page: data.page }));
      } else {
        broadcast(JSON.stringify({ type: 'adminMessage', message: data.message }));
      }
    }
  });

  ws.on('close', () => {
    console.log(`User  ${userId} disconnected`);
    delete clients[userId];
    if (userId === adminId) {
      adminId = null; // Reset admin if the admin disconnects
    }
    broadcast(JSON.stringify({ type: 'userevent', message: `${userId} left the chat` }));
  });
});

function broadcast(data) {
  for (const client of Object.values(clients)) {
    client.send(data);
  }
}

server.listen(8080, () => {
  console.log('WebSocket server is running on ws://localhost:8080');
});