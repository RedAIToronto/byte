const ModelCard = ({ model, onBid }) => {
    return (
        <div className="border border-green-400/20 p-4 bg-black/50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg neon-text">{model.name}</h3>
                    <p className="text-sm opacity-70">By: {model.creator}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                    model.status === 'ACTIVE' ? 'bg-green-400/20 text-green-400' : 
                    'bg-purple-400/20 text-purple-400'
                }`}>
                    {model.status}
                </div>
            </div>

            <div className="mb-4 text-sm opacity-70">
                <p>{model.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <div className="text-xs opacity-70">BASE MODEL</div>
                    <div className="text-sm">{model.baseModel}</div>
                </div>
                <div>
                    <div className="text-xs opacity-70">CATEGORY</div>
                    <div className="text-sm">{model.category}</div>
                </div>
            </div>

            <div className="mb-4">
                <div className="text-sm opacity-70">CURRENT BID</div>
                <div className="text-xl neon-text">${model.currentBid} $BYTE</div>
            </div>

            <button
                onClick={() => onBid(model)}
                className="w-full py-2 border border-green-400 text-green-400 
                         hover:bg-green-400/10 transition-colors"
            >
                PLACE_BID
            </button>
        </div>
    );
}; 