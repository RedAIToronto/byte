const HeaderAnimation = () => {
    const [glitchText, setGlitchText] = React.useState('');
    const [scanLine, setScanLine] = React.useState(0);
    const [hoveredLink, setHoveredLink] = React.useState(null);
    
    const headerAscii = `
██████╗ ██╗   ██╗████████╗███████╗
██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝
██████╔╝ ╚████╔╝    ██║   █████╗  
██╔══██╗  ╚██╔╝     ██║   ██╔══╝  
██████╔╝   ██║      ██║   ███████╗
╚═════╝    ╚═╝      ╚═╝   ╚══════╝`;

    const glitchChars = '█▀░▄▀█▄▌▐═║╔╗╚╝';
    
    const triggerGlitch = React.useCallback(() => {
        let art = headerAscii;
        let glitched = art.split('');
        const glitchCount = Math.floor(Math.random() * 15) + 5;
        
        for (let i = 0; i < glitchCount; i++) {
            const pos = Math.floor(Math.random() * glitched.length);
            glitched[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        
        setGlitchText(glitched.join(''));
        setTimeout(() => setGlitchText(''), 100);
    }, []);

    React.useEffect(() => {
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) triggerGlitch();
        }, 200);

        const scanInterval = setInterval(() => {
            setScanLine(prev => (prev + 1) % 100);
        }, 16);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(scanInterval);
        };
    }, [triggerGlitch]);

    return (
        <header className="relative w-full bg-black overflow-hidden border-b border-green-500/20">
            <div className="relative h-44 md:h-52 flex items-center justify-center bg-gradient-to-b from-black via-green-950/5 to-black">
                <div className="absolute inset-0">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={`rain-${i}`}
                            className="absolute text-green-500/10 whitespace-pre"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `fall ${3 + Math.random() * 2}s linear infinite`,
                                animationDelay: `-${Math.random() * 3}s`,
                                fontSize: `${Math.random() * 12 + 8}px`
                            }}
                        >
                            {glitchChars[Math.floor(Math.random() * glitchChars.length)]}
                        </div>
                    ))}
                </div>

                <div className="relative px-4 w-full" onMouseEnter={triggerGlitch}>
                    <pre
                        className="text-green-400 font-mono text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] whitespace-pre select-none text-center transform hover:scale-105 transition-transform duration-300"
                        style={{
                            textShadow: '0 0 10px rgba(0, 255, 157, 0.8), 0 0 15px rgba(185, 103, 255, 0.5)',
                            animation: 'pulse 2s infinite'
                        }}
                    >
                        {glitchText || headerAscii}
                    </pre>

                    <div 
                        className="absolute left-0 right-0 h-[1px] bg-green-400/20 pointer-events-none"
                        style={{
                            top: `${scanLine}%`,
                            boxShadow: '0 0 10px rgba(0, 255, 157, 0.5)'
                        }} 
                    />
                </div>

                <nav className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 p-3 bg-black/50 backdrop-blur-sm border-t border-green-500/30">
                    {['TERMINAL', 'NETWORK', 'DOCS', 'STATS'].map(item => (
                        <a
                            key={item}
                            href="#"
                            className={`text-green-400 text-sm font-mono transition-all duration-200 transform hover:scale-110 
                                ${hoveredLink === item ? 'text-white' : 'hover:text-green-300'}`}
                            onMouseEnter={() => setHoveredLink(item)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className={`text-green-600 mr-2 transition-transform duration-200 inline-block
                                ${hoveredLink === item ? 'rotate-90' : ''}`}>
                                ▶
                            </span>
                            {item}
                        </a>
                    ))}
                </nav>
            </div>

            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(90deg, 
                            rgba(0,0,0,0.7) 0%, 
                            transparent 15%, 
                            transparent 85%, 
                            rgba(0,0,0,0.7) 100%
                        )
                    `,
                    mixBlendMode: 'overlay'
                }} 
            />

            <style jsx="true">{`
                @keyframes fall {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(0.99); }
                }
            `}</style>
        </header>
    );
}; 