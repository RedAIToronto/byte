const Resource = require('../models/resource.model');

class ResourceService {
    async getAvailableResources() {
        try {
            return await Resource.find({ 
                status: 'AVAILABLE',
                'metadata.health': { $gte: 0.8 }
            });
        } catch (error) {
            console.error('Error fetching resources:', error);
            throw error;
        }
    }

    async allocateResource(bid) {
        try {
            const resource = await Resource.findOne({
                status: 'AVAILABLE',
                pricePerUnit: { $lte: bid.maxPrice },
                'metadata.vramSize': { $gte: bid.requiredVram }
            });

            if (!resource) {
                throw new Error('No suitable resources available');
            }

            // Update resource status and create allocation record
            resource.status = 'ALLOCATED';
            await resource.save();

            return resource;
        } catch (error) {
            console.error('Error allocating resource:', error);
            throw error;
        }
    }
}

module.exports = ResourceService; 