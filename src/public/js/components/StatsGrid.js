const StatsGrid = ({ stats }) => {
    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="ACTIVE_PROVIDERS" value={stats.activeProviders} />
            <StatCard label="AVAILABLE_GPUS" value={stats.availableGPUs} />
            <StatCard label="TOTAL_PROCESSES" value={stats.totalProcesses} />
            <StatCard label="AVG_COST_PER_UNIT" value={`$${stats.avgCostPerUnit}`} />
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="border border-green-400/20 p-4 bg-black/50">
        <div className="text-sm opacity-70">{label}</div>
        <div className="text-2xl neon-text">{value}</div>
    </div>
); 