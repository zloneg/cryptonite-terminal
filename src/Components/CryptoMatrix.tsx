import { useEffect, useRef } from 'react';

function CryptoMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const symbols = ["₿", "Ξ", "$", "€", "₪", "BTC", "ETH", "GOLD", "777"];
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // An array to store the current Y position of each column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            // Translucent background for a trailing effect
            ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

            // Turquoise color for text
            ctx!.fillStyle = "#00f2ff";
            ctx!.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                // We select a random symbol
                const text = symbols[Math.floor(Math.random() * symbols.length)];
                
                // Drawing a symbol
                ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

                // If the symbol reaches the end of the screen, we return it to the beginning with a random delay.
                if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        const interval = setInterval(draw, 33);

        return () => clearInterval(interval);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'absolute', 
                top: 0, left: 0, 
                width: '100%', height: '100%',
                opacity: 0.8 
            }} 
        />
    );
}

export default CryptoMatrix;