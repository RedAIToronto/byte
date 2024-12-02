const express = require('express');
const router = express.Router();
const ResourceManager = require('../services/resource-manager');

const resourceManager = new ResourceManager();

// Mock data for development
const mockResources = [
    {
        id: 'gpu_001',
        type: 'GPU',
        model: 'RTX 4090',
        status: 'AVAILABLE',
        metrics: {
            temperature: 65,
            utilization: 80,
            memory: 24
        }
    },
    {
        id: 'gpu_002',
        type: 'GPU',
        model: 'A100',
        status: 'AVAILABLE',
        metrics: {
            temperature: 70,
            utilization: 90,
            memory: 80
        }
    }
];

// Get all resources
router.get('/', (req, res) => {
    try {
        // For development, return mock data
        res.json({
            success: true,
            data: mockResources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch resources'
        });
    }
});

// Get resource by ID
router.get('/:id', (req, res) => {
    try {
        const resource = mockResources.find(r => r.id === req.params.id);
        if (!resource) {
            return res.status(404).json({
                success: false,
                error: 'Resource not found'
            });
        }
        res.json({
            success: true,
            data: resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch resource'
        });
    }
});

module.exports = router; 