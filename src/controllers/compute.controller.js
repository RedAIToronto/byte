const ComputeService = require('../services/compute.service');
const SolanaService = require('../services/solana.service');

class ComputeController {
    static async submitBid(req, res) {
        try {
            const { walletAddress, processName, units, bidPrice, duration } = req.body;
            
            // Calculate total cost in $BYTE
            const totalCost = units * bidPrice * duration;
            
            // Verify wallet has enough $BYTE
            const balance = await SolanaService.getTokenBalance(walletAddress);
            if (balance < totalCost) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Insufficient $BYTE balance' 
                });
            }
            
            // Create payment transaction
            const transaction = await SolanaService.processPayment(
                walletAddress, 
                totalCost
            );
            
            // Create compute process
            const process = await ComputeService.createProcess({
                walletAddress,
                processName,
                units,
                bidPrice,
                duration,
                totalCost
            });
            
            res.json({
                success: true,
                process,
                transaction: transaction.serialize()
            });
        } catch (error) {
            console.error('Error submitting bid:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
}

module.exports = ComputeController; 