const Header = ({ onNavigate }) => (
    <header className="border-b border-green-400/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold neon-text">[BYTE]</div>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" 
                       onClick={() => onNavigate('models')} 
                       className="hover:text-green-300 transition-colors">
                        AI_MODELS
                    </a>
                    <a href="#" 
                       onClick={() => onNavigate('finetune')} 
                       className="hover:text-green-300 transition-colors">
                        FINETUNE
                    </a>
                    <a href="#" 
                       onClick={() => onNavigate('mybids')} 
                       className="hover:text-green-300 transition-colors">
                        MY_BIDS
                    </a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm opacity-70">BALANCE: 1000 $BYTE</div>
                <button 
                    onClick={() => window.connectWallet?.()}
                    className="px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400/10 transition-colors"
                >
                    CONNECT_WALLET
                </button>
            </div>
        </div>
    </header>
); 