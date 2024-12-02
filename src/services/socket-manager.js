class SocketManager {
    constructor(io) {
        this.io = io;
        this.connectedClients = new Map();
        this.resourceMetrics = new Map();
        
        // Initialize mock data
        this.mockGPUs = [
            { id: 'gpu_001', status: 'AVAILABLE' },
            { id: 'gpu_002', status: 'AVAILABLE' }
        ];
        
        // Update metrics every 5 seconds
        setInterval(() => this.broadcastMetrics(), 5000);
    }

    handleConnection(socket) {
        console.log(`Client connected: ${socket.id}`);
        this.connectedClients.set(socket.id, {
            joinedAt: Date.now(),
            lastActive: Date.now()
        });

        // Send initial data
        this.sendInitialData(socket);

        // Handle events
        socket.on('request-resources', () => this.handleResourceRequest(socket));
        socket.on('submit-bid', (bid) => this.handleBid(socket, bid));
        socket.on('disconnect', () => this.handleDisconnect(socket));
    }

    async sendInitialData(socket) {
        const stats = await this.getSystemStats();
        socket.emit('system-stats', stats);
    }

    async getSystemStats() {
        return {
            activeProviders: this.connectedClients.size,
            availableGPUs: this.getAvailableGPUCount(),
            totalProcesses: this.getTotalProcessCount(),
            avgCostPerUnit: this.calculateAverageCost()
        };
    }

    getAvailableGPUCount() {
        return this.mockGPUs.filter(gpu => gpu.status === 'AVAILABLE').length;
    }

    getTotalProcessCount() {
        // Mock process count for now
        return Math.floor(Math.random() * 10) + 5;
    }

    calculateAverageCost() {
        // Mock average cost
        return 0.45;
    }

    handleResourceRequest(socket) {
        socket.emit('available-resources', this.mockGPUs);
    }

    handleBid(socket, bid) {
        console.log('Received bid:', bid);
        // Implement bid handling logic
    }

    handleDisconnect(socket) {
        console.log(`Client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
    }

    async broadcastMetrics() {
        const stats = await this.getSystemStats();
        this.io.emit('system-stats', stats);
    }
}

module.exports = SocketManager; 