const { Connection, PublicKey, Transaction } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Connection(
    process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    'confirmed'
);

const BYTE_TOKEN_ADDRESS = process.env.BYTE_TOKEN_ADDRESS;
const BYTE_DECIMALS = 9;

class SolanaService {
    static async getTokenBalance(walletAddress) {
        try {
            const pubKey = new PublicKey(walletAddress);
            const tokenPubKey = new PublicKey(BYTE_TOKEN_ADDRESS);
            
            const tokenAccount = await Token.getAssociatedTokenAddress(
                TOKEN_PROGRAM_ID,
                tokenPubKey,
                pubKey
            );
            
            const balance = await connection.getTokenAccountBalance(tokenAccount);
            return balance.value.uiAmount;
        } catch (error) {
            console.error('Error getting token balance:', error);
            throw error;
        }
    }

    static async processPayment(fromWallet, amount) {
        try {
            const tokenPubKey = new PublicKey(BYTE_TOKEN_ADDRESS);
            const fromPubKey = new PublicKey(fromWallet);
            
            // Convert amount to token units
            const tokenAmount = amount * (10 ** BYTE_DECIMALS);
            
            // Create transfer instruction
            const transaction = new Transaction().add(
                Token.createTransferInstruction(
                    TOKEN_PROGRAM_ID,
                    fromPubKey,
                    tokenPubKey,
                    fromPubKey,
                    [],
                    tokenAmount
                )
            );
            
            return transaction;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    }
}

module.exports = SolanaService; 