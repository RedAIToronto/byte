const ResourceCard = ({ resource, onRent }) => {
    const [metrics, setMetrics] = React.useState(resource.metrics);
    
    React.useEffect(() => {
        const socket = io();
        socket.on(`resource-metrics-${resource.id}`, (newMetrics) => {
            setMetrics(newMetrics);
        });
        return () => socket.disconnect();
    }, [resource.id]);

    return (
        <div className="border border-green-400/20 p-4 bg-black/50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg neon-text">{resource.model}</h3>
                    <p className="text-sm opacity-70">{resource.type} | ID: {resource.id}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                    resource.status === 'AVAILABLE' ? 'bg-green-400/20 text-green-400' : 
                    'bg-red-400/20 text-red-400'
                }`}>
                    {resource.status}
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <MetricBox label="TEMP" value={`${metrics.temperature}°C`} />
                <MetricBox label="UTIL" value={`${metrics.utilization}%`} />
                <MetricBox label="MEM" value={`${metrics.memory}GB`} />
            </div>

            {/* Utilization Bar */}
            <div className="mb-4">
                <div className="h-2 bg-gray-800 rounded overflow-hidden">
                    <div 
                        className="h-full bg-green-400 transition-all duration-500"
                        style={{ width: `${metrics.utilization}%` }}
                    />
                </div>
            </div>

            {/* Pricing */}
            <div className="mb-4">
                <div className="text-sm opacity-70">COST PER HOUR</div>
                <div className="text-xl neon-text">${(resource.pricePerHour || 0.5).toFixed(2)}</div>
            </div>

            {/* Action Button */}
            <button
                onClick={() => onRent(resource)}
                disabled={resource.status !== 'AVAILABLE'}
                className="w-full py-2 border border-green-400 text-green-400 
                         hover:bg-green-400/10 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed"
            >
                RENT_COMPUTE
            </button>
        </div>
    );
};

const MetricBox = ({ label, value }) => (
    <div className="text-center">
        <div className="text-xs opacity-70">{label}</div>
        <div className="text-sm">{value}</div>
    </div>
); 