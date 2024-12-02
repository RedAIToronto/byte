const BidModal = ({ model, onConfirm, onClose }) => {
    const [bidAmount, setBidAmount] = React.useState(model.currentBid + 50);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-green-400/20 p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl mb-4 neon-text">PLACE_BID</h3>
                
                <div className="mb-4">
                    <div className="text-sm opacity-70">MODEL</div>
                    <div>{model.name}</div>
                </div>

                <div className="mb-4">
                    <div className="text-sm opacity-70">CURRENT_BID</div>
                    <div className="text-lg">{model.currentBid} $BYTE</div>
                </div>

                <div className="mb-4">
                    <div className="text-sm opacity-70">YOUR_BID ($BYTE)</div>
                    <input 
                        type="number"
                        min={model.currentBid + 1}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        className="w-full bg-black border border-green-400/20 px-3 py-2 rounded"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={() => onConfirm(bidAmount)}
                        className="flex-1 py-2 bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400/30"
                    >
                        CONFIRM_BID
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-green-400/20 hover:bg-green-400/10"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}; 