const ModelMarketplace = () => {
    const [models, setModels] = React.useState([
        {
            id: 'm1',
            name: 'Female Claude Assistant',
            creator: '0x1234...5678',
            description: 'A finetuned Claude model with female personality traits and enhanced creativity',
            baseModel: 'Claude-3',
            category: 'Assistant',
            status: 'ACTIVE',
            currentBid: 500
        },
        {
            id: 'm2',
            name: 'Cyberpunk RPG Master',
            creator: '0x8765...4321',
            description: 'Specialized in running cyberpunk-themed RPG sessions',
            baseModel: 'GPT-4',
            category: 'Gaming',
            status: 'ACTIVE',
            currentBid: 750
        }
        // Add more mock models
    ]);

    const [showBidModal, setShowBidModal] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState(null);

    const handleBid = (model) => {
        setSelectedModel(model);
        setShowBidModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-2xl neon-text mb-2">AVAILABLE MODELS</h2>
                <p className="opacity-70">Bid on finetuned AI models or list your own</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map(model => (
                    <ModelCard 
                        key={model.id}
                        model={model}
                        onBid={handleBid}
                    />
                ))}
            </div>

            {showBidModal && (
                <BidModal 
                    model={selectedModel}
                    onConfirm={(amount) => {
                        console.log(`Bid placed: ${amount} $BYTE on ${selectedModel.name}`);
                        setShowBidModal(false);
                    }}
                    onClose={() => setShowBidModal(false)}
                />
            )}
        </div>
    );
}; 