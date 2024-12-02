const AsciiAnimation = () => {
    const [frame, setFrame] = React.useState(0);
    const [glitchText, setGlitchText] = React.useState('');
    const [scanLine, setScanLine] = React.useState(0);
    
    const byteAscii = `
▄▄▄▄    ▓██   ██▓▄▄▄█████▓▓█████     ▄████▄   ██▓     ▒█████   █    ██ ▓█████▄ 
▓█████▄  ▒██  ██▒▓  ██▒ ▓▒▓█   ▀    ▒██▀ ▀█  ▓██▒    ▒██▒  ██▒ ██  ▓██▒▒██▀ ██▌
▒██▒ ▄██  ▒██ ██░▒ ▓██░ ▒░▒███      ▒▓█    ▄ ▒██░    ▒██░  ██▒▓██  ▒██░░██   █▌
▒██░█▀    ░ ▐██▓░░ ▓██▓ ░ ▒▓█  ▄    ▒▓▓▄ ▄██▒▒██░    ▒██   ██░▓▓█  ░██░░▓█▄   ▌
░▓█  ▀█▓  ░ ██▒▓░  ▒██▒ ░ ░▒████▒   ▒ ▓███▀ ░░██████▒░ ████▓▒░▒▒█████▓ ░▒████▓ `;

    const altAscii = `
 ██▓     ▄▄▄       █    ██  ███▄    █  ▄████▄   ██░ ██     ██▓███   ▄▄▄      ▓█████▄ 
▓██▒    ▒████▄     ██  ▓██▒ ██ ▀█   █ ▒██▀ ▀█  ▓██░ ██▒   ▓██░  ██▒▒████▄    ▒██▀ ██▌
▒██░    ▒██  ▀█▄  ▓██  ▒██░▓██  ▀█ ██▒▒▓█    ▄ ▒██▀▀██░   ▓██░ ██▓▒▒██  ▀█▄  ░██   █▌`;

    const smallerArt = `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
████░▄▄░██░▄▄░██░▄▄░██░▄▄░████
████░██░██░██░██░██░██░██░████
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`;

    const glitchChars = '█▀░▄▀█▄▌▐═║╔╗╚╝';
    
    React.useEffect(() => {
        // Frame animation
        const frameInterval = setInterval(() => {
            setFrame(prev => (prev + 1) % 3);
        }, 3000);

        // Glitch effect
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                let art = frame === 0 ? byteAscii : frame === 1 ? altAscii : smallerArt;
                let glitched = art.split('');
                
                for (let i = 0; i < 20; i++) {
                    const pos = Math.floor(Math.random() * glitched.length);
                    glitched[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                
                setGlitchText(glitched.join(''));
                
                setTimeout(() => {
                    setGlitchText('');
                }, 100);
            }
        }, 200);

        // Scan line animation
        const scanInterval = setInterval(() => {
            setScanLine(prev => (prev + 1) % 100);
        }, 16);

        return () => {
            clearInterval(frameInterval);
            clearInterval(glitchInterval);
            clearInterval(scanInterval);
        };
    }, [frame]);

    return (
        <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
            {/* Matrix rain background */}
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={`rain-${i}`}
                    className="absolute text-green-500/20 whitespace-pre"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `fall ${3 + Math.random() * 3}s linear infinite`,
                        animationDelay: `-${Math.random() * 3}s`,
                    }}
                >
                    {glitchChars[Math.floor(Math.random() * glitchChars.length)]}
                </div>
            ))}

            {/* Main ASCII art */}
            <div className="relative py-8">
                <pre
                    className="text-green-400 font-mono text-sm sm:text-base whitespace-pre select-none"
                    style={{
                        textShadow: '0 0 10px rgba(0, 255, 157, 0.8), 0 0 15px rgba(185, 103, 255, 0.5)',
                        animation: 'pulse 2s infinite',
                        lineHeight: '1.2em'
                    }}
                >
                    {glitchText || (frame === 0 ? byteAscii : frame === 1 ? altAscii : smallerArt)}
                </pre>

                {/* Scan line */}
                <div
                    className="absolute left-0 right-0 h-[2px] bg-green-400/20 pointer-events-none"
                    style={{
                        top: `${scanLine}%`,
                        boxShadow: '0 0 10px rgba(0, 255, 157, 0.5)'
                    }}
                />
            </div>

            <style jsx="true">{`
                @keyframes fall {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}; 