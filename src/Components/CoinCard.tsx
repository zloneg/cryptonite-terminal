import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCoin } from '../Redux/CoinSlice';
import type { RootState } from '../Redux/store';
import type { CoinModel } from '../Models/CoinModel';
import coinService from '../Services/CoinService';
import './CoinCard.css';

interface CoinCardProps {
    coin: CoinModel;
}

function CoinCard({ coin }: CoinCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [prices, setPrices] = useState<{ usd: number, eur: number, ils: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    
    // Checking the selection by symbol (BTC, ETH...)
    const isSelected = useSelector((state: RootState) => 
        state.coins.selectedCoinIds.includes(coin.symbol.toUpperCase())
    );

    const handleMoreInfo = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        if (!prices) {
            setIsLoading(true);
            try {
                const data = await coinService.getCoinDetails(coin.id);
                setPrices(data);
            } catch (err) {
                console.error("Error fetching prices", err);
            }
            setIsLoading(false);
        }
        
        setIsOpen(true);
    };

    return (
        <div className="coin-card">
            {/* SWITCH */}
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => dispatch(toggleCoin(coin.symbol))} 
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            <img 
                src={coin.image} 
                alt={coin.name} 
                style={{ 
                    width: '50px', 
                    marginBottom: '10px', 
                    marginTop: '10px',
                    filter: 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.2))' 
                }} 
            />
            
            <h3 style={{ margin: '5px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {coin.symbol}
            </h3>
            <p style={{ color: '#555', fontSize: '12px', marginBottom: '15px' }}>
                {coin.name}
            </p>
            
            <button className="more-info-btn" onClick={handleMoreInfo}>
                {isLoading ? "LOADING..." : (isOpen ? "CLOSE_INFO" : "MORE_INFO")}
            </button>

            {/* PRICE BLOCK */}
            {isOpen && prices && (
                <div className="prices-box">
                    <div style={{ marginBottom: '5px' }}>
                        <span style={{ color: '#00f2ff' }}>USD:</span> ${prices.usd.toLocaleString()}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <span style={{ color: '#00f2ff' }}>EUR:</span> €{prices.eur.toLocaleString()}
                    </div>
                    <div>
                        <span style={{ color: '#00f2ff' }}>ILS:</span> ₪{prices.ils.toLocaleString()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoinCard;