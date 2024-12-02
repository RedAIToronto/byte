const { Connection, PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

class SolanaService {
    constructor() {
        if (!process.env.SOLANA_ENDPOINT || !process.env.BYTE_TOKEN_ADDRESS) {
            console.warn('Solana configuration missing. Running in mock mode.');
            this.mockMode = true;
            return;
        }

        try {
            this.connection = new Connection(process.env.SOLANA_ENDPOINT);
            this.BYTE_TOKEN = new PublicKey(process.env.BYTE_TOKEN_ADDRESS);
        } catch (error) {
            console.error('Failed to initialize Solana connection:', error);
            this.mockMode = true;
        }
    }

    async getTokenHolders() {
        if (this.mockMode) {
            return {
                totalHolders: 1247,
                totalSupply: 1000000000,
                holders: [
                    { address: 'mock_address_1', balance: 100000 },
                    { address: 'mock_address_2', balance: 50000 }
                ]
            };
        }

        try {
            const accounts = await this.connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
                filters: [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: this.BYTE_TOKEN.toBase58()
                        }
                    }
                ]
            });

            return {
                totalHolders: accounts.length,
                totalSupply: await this.getTotalSupply(),
                holders: await this.processHolderAccounts(accounts)
            };
        } catch (error) {
            console.error('Error fetching token holders:', error);
            throw error;
        }
    }

    async getTotalSupply() {
        if (this.mockMode) {
            return 1000000000;
        }

        try {
            const tokenSupply = await this.connection.getTokenSupply(this.BYTE_TOKEN);
            return tokenSupply.value.uiAmount;
        } catch (error) {
            console.error('Error fetching total supply:', error);
            throw error;
        }
    }

    async processHolderAccounts(accounts) {
        if (this.mockMode) {
            return [];
        }

        return Promise.all(accounts.map(async ({ pubkey, account }) => {
            const balance = await this.connection.getTokenAccountBalance(pubkey);
            return {
                address: pubkey.toString(),
                balance: balance.value.uiAmount
            };
        }));
    }
}

module.exports = SolanaService; 