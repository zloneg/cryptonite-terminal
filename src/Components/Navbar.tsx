import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../Redux/CoinSlice';
import { useState, useEffect } from 'react';
import coinService from '../Services/CoinService';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [fng, setFng] = useState<{value: string, value_classification: string} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    coinService.getFearAndGreed().then(data => setFng(data));
    return () => clearInterval(timer);
  }, []);

  const getFngColor = (val: number) => {
    if (val <= 25) return '#ff0000';
    if (val <= 45) return '#ff8c00';
    if (val >= 75) return '#00ff00';
    if (val >= 55) return '#adff2f';
    return '#ffd700';
  };

  return (
    <nav style={{ 
        display: 'flex', gap: '30px', padding: '0 40px', 
        height: '80px', 
        background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid #00f2ff',
        alignItems: 'center', position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(10px)', fontFamily: 'Orbitron'
    }}>
        <Link to="/" style={{ color: '#00f2ff', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>HOME</Link>
        <Link to="/reports" style={{ color: '#00f2ff', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>REPORTS</Link>
        <Link to="/recommendations" style={{ color: '#00f2ff', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>AI_NODE</Link>
        <Link to="/about" style={{ color: '#00f2ff', textDecoration: 'none', fontSize: '13px', letterSpacing: '2px' }}>ABOUT</Link>
        
        {fng && (
            <div style={{ marginLeft: '40px', fontSize: '10px', letterSpacing: '2px', borderLeft: '1px solid #222', paddingLeft: '20px' }}>
                <span style={{ color: '#555' }}>MARKET_SENTIMENT:</span> <br/>
                <span style={{ color: getFngColor(Number(fng.value)) }}>
                    {fng.value_classification.toUpperCase()} [{fng.value}]
                </span>
            </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: '100%' }}>
            {location.pathname === '/' ? (
                <input 
                    type="text" 
                    placeholder="SEARCH_DB..." 
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
                    style={{ 
                        background: 'transparent', border: '1px solid #00f2ff', 
                        color: '#00f2ff', padding: '8px 15px', borderRadius: '2px',
                        outline: 'none', boxShadow: '0 0 10px rgba(0, 242, 255, 0.1)',
                        fontFamily: 'Courier New', fontSize: '12px'
                    }}
                />
            ) : (
                /* LARGE DIGITAL CLOCK */
                <div className="digital-clock">
                    {time}
                </div>
            )}
        </div>
    </nav>
  );
}

export default Navbar;