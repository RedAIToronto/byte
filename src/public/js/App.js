const App = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const [systemStats, setSystemStats] = React.useState({
        activeProviders: 0,
        availableGPUs: 0,
        totalProcesses: 0,
        avgCostPerUnit: 0
    });
    const [walletConnected, setWalletConnected] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState('');
    const [currentView, setCurrentView] = React.useState('dashboard');

    React.useEffect(() => {
        const socket = io();
        socket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        socket.on('system-stats', (stats) => {
            console.log('System stats:', stats);
            setSystemStats(stats);
        });

        window.connectWallet = async () => {
            try {
                const { solana } = window;
                if (solana?.isPhantom) {
                    const response = await solana.connect();
                    setWalletAddress(response.publicKey.toString());
                    setWalletConnected(true);
                }
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        };

        return () => socket.disconnect();
    }, []);

    const renderContent = () => {
        switch (currentView) {
            case 'models':
                return <ModelMarketplace />;
            case 'finetune':
                return <div className="text-center py-8">FINETUNE_INTERFACE_COMING_SOON</div>;
            case 'mybids':
                return <div className="text-center py-8">MY_BIDS_COMING_SOON</div>;
            default:
                return (
                    <>
                        <LandingSection />
                        <div className="max-w-7xl mx-auto px-4">
                            <Terminal isConnected={isConnected} />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-green-400 font-mono">
            <HeaderAnimation />
            <main className="flex-grow">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
}; 