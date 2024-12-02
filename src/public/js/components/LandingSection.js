const LandingSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-black/30 border border-green-400/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">24.5K</div>
                    <div className="text-sm opacity-70">ACTIVE MODELS</div>
                </div>
                <div className="bg-black/30 border border-green-400/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2.1M</div>
                    <div className="text-sm opacity-70">TOTAL VALUE LOCKED</div>
                </div>
                <div className="bg-black/30 border border-green-400/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">156K</div>
                    <div className="text-sm opacity-70">SUCCESSFUL TRADES</div>
                </div>
            </div>

            {/* Featured Models */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <span className="text-green-400 mr-2">▶</span>
                    FEATURED_MODELS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Claude Persona Suite",
                            creator: "0x742...3ab4",
                            description: "Collection of finely-tuned Claude personalities",
                            currentBid: "2,450",
                            timeLeft: "2d 14h"
                        },
                        {
                            name: "GPT Trading Bot",
                            creator: "0x156...9dc2",
                            description: "Automated crypto trading assistant",
                            currentBid: "1,850",
                            timeLeft: "16h 22m"
                        },
                        {
                            name: "AI Dungeon Master",
                            creator: "0x932...7fe1",
                            description: "Advanced RPG storyteller and game master",
                            currentBid: "950",
                            timeLeft: "4d 6h"
                        }
                    ].map(model => (
                        <div key={model.name} className="bg-black/30 border border-green-400/20 p-6 rounded-lg hover:border-green-400/40 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-green-400">{model.name}</h3>
                                    <div className="text-sm opacity-70">by {model.creator}</div>
                                </div>
                                <div className="text-xs bg-green-400/10 px-2 py-1 rounded">
                                    {model.timeLeft}
                                </div>
                            </div>
                            <p className="text-sm opacity-70 mb-4">{model.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs opacity-70">CURRENT BID</div>
                                    <div className="text-lg font-bold text-green-400">{model.currentBid} $BYTE</div>
                                </div>
                                <button className="px-4 py-2 border border-green-400 text-green-400 rounded hover:bg-green-400/10 transition-colors">
                                    BID
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <span className="text-green-400 mr-2">▶</span>
                    RECENT_ACTIVITY
                </h2>
                <div className="bg-black/30 border border-green-400/20 rounded-lg">
                    {[
                        { action: "BID_PLACED", model: "Claude Persona Suite", amount: "2,450", time: "2m ago" },
                        { action: "MODEL_LISTED", model: "Stable Diffusion Expert", amount: "1,200", time: "5m ago" },
                        { action: "SALE_COMPLETED", model: "Trading Algorithm v2", amount: "3,600", time: "12m ago" },
                        { action: "BID_PLACED", model: "AI Dungeon Master", amount: "950", time: "15m ago" }
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-green-400/20 last:border-0">
                            <div className="flex items-center space-x-4">
                                <div className="text-xs bg-green-400/10 px-2 py-1 rounded">
                                    {activity.action}
                                </div>
                                <div className="text-sm">{activity.model}</div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-green-400 font-bold">{activity.amount} $BYTE</div>
                                <div className="text-xs opacity-70">{activity.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 