class SocketService {
    constructor(io) {
        this.io = io;
        this.activeConnections = new Set();
        this.resourceMetrics = {};
    }

    initialize() {
        this.io.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.activeConnections.add(socket.id);

        // Send initial data
        this.emitMarketStats(socket);
        this.emitResourceMetrics(socket);

        socket.on('disconnect', () => {
            this.activeConnections.delete(socket.id);
        });
    }

    emitMarketStats(socket) {
        const stats = {
            activeProviders: this.activeConnections.size,
            availableGPUs: this.calculateAvailableGPUs(),
            averageCost: this.calculateAverageCost()
        };
        socket.emit('market-stats', stats);
    }

    calculateAvailableGPUs() {
        // Implement real GPU availability calculation
        return Object.keys(this.resourceMetrics).length;
    }

    calculateAverageCost() {
        // Implement real cost calculation based on market data
        return 0.45; // Example fixed cost for now
    }
}

module.exports = SocketService; 