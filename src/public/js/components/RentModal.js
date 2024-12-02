const RentModal = ({ resource, onConfirm, onClose }) => {
    const [duration, setDuration] = React.useState(1);
    const cost = (resource.pricePerHour || 0.5) * duration;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-green-400/20 p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl mb-4 neon-text">RENT_CONFIRMATION</h3>
                
                <div className="mb-4">
                    <div className="text-sm opacity-70">RESOURCE</div>
                    <div>{resource.model} ({resource.id})</div>
                </div>

                <div className="mb-4">
                    <div className="text-sm opacity-70">DURATION (HOURS)</div>
                    <input 
                        type="number"
                        min="1"
                        max="24"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full bg-black border border-green-400/20 px-3 py-2 rounded"
                    />
                </div>

                <div className="mb-6">
                    <div className="text-sm opacity-70">TOTAL_COST</div>
                    <div className="text-xl neon-text">${cost.toFixed(2)}</div>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={() => onConfirm(duration)}
                        className="flex-1 py-2 bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400/30"
                    >
                        CONFIRM
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