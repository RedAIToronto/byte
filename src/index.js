const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const tokenRoutes = require('./routes/token.routes');

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/token', tokenRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected');
    
    // Emit initial market stats
    socket.emit('market-stats', {
        activeProviders: 42,
        availableGPUs: 156,
        averageCost: 0.45
    });

    // Handle resource updates
    socket.on('request-resources', () => {
        // Emit available resources periodically
        socket.emit('available-resources', [
            {
                _id: 'gpu_001',
                resourceType: 'NVIDIA GPU',
                metadata: {
                    gpuModel: 'RTX 4090',
                    vramSize: 24,
                    cudaCores: 16384
                },
                pricePerUnit: 0.45
            }
            // Add more realistic resource examples
        ]);
    });
});

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 