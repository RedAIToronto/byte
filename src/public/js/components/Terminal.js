const Terminal = ({ isConnected }) => {
    return (
        <div className="border border-green-400/20 p-4 bg-black/50">
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm opacity-70">SYSTEM_TERMINAL</div>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <pre className="text-sm">
                {`> Connection status: ${isConnected ? 'ONLINE' : 'OFFLINE'}
> System initialized
> Monitoring resources...`}
            </pre>
        </div>
    );
}; 