const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const SocketManager = require('./services/socket-manager');
const tokenRoutes = require('./routes/token.routes');
const resourceRoutes = require('./routes/resource.routes');

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'development' ? '*' : process.env.ALLOWED_ORIGINS
    }
});

// Initialize socket manager
const socketManager = new SocketManager(io);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/token', tokenRoutes);
app.use('/api/resources', resourceRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => socketManager.handleConnection(socket));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 