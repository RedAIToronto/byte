const express = require('express');
const router = express.Router();
const SolanaService = require('../services/solana.service');

const solanaService = new SolanaService();

router.get('/metrics', async (req, res) => {
    try {
        const tokenMetrics = await solanaService.getTokenHolders();
        res.json({
            success: true,
            data: tokenMetrics
        });
    } catch (error) {
        console.error('Error fetching token metrics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch token metrics',
            details: error.message
        });
    }
});

module.exports = router; 