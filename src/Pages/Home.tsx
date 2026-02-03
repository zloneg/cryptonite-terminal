import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../Redux/store'; 
import { clearAllSelected } from '../Redux/CoinSlice';

import Header from '../Components/Header';
import coinService from '../Services/CoinService';
import type { CoinModel } from '../Models/CoinModel';
import CoinCard from '../Components/CoinCard.tsx';
import CoinDialog from '../Components/CoinDialog'; 

function Home() {
    const [coins, setCoins] = useState<CoinModel[]>([]);
    const dispatch = useDispatch();

    const searchTerm = useSelector((state: RootState) => state.coins.searchTerm);
    const selectedCount = useSelector((state: RootState) => state.coins.selectedCoinIds.length);

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const loadCoins = async () => {
            try {
                const data = await coinService.getAllCoins();
                setCoins(data);
            } catch (error) {
                console.error("System Error:", error);
            }
        };
        loadCoins();
    }, []);

    return (
        <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
            <Header />
            <CoinDialog />

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* HEADLINE */}
                <h2 className="section-title">Cryptocurrency_Database</h2><br></br><br></br>
    
                
                {/* CONTROL SYSTEM */}
                <div className="system-controls">
                    <div className="system-status">
                        Nodes_Active: [ <span style={{color: selectedCount > 0 ? '#00f2ff' : '#555'}}>{selectedCount}</span> / 5 ]
                    </div>

                    {selectedCount > 0 && (
                        <button 
                            onClick={() => {
    if (window.confirm("ARE YOU SURE YOU WANT TO TERMINATE ALL ACTIVE NODES?")) {
        dispatch(clearAllSelected());
    }
}}
                            style={{
                                background: 'transparent', border: '1px solid #ff4444', color: '#ff4444',
                                padding: '10px 25px', borderRadius: '2px', cursor: 'pointer',
                                fontSize: '10px', letterSpacing: '3px', transition: '0.3s',
                                textTransform: 'uppercase', fontFamily: 'Orbitron'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#ff4444';
                                e.currentTarget.style.color = '#000';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#ff4444';
                            }}
                        >
                            Terminate_All_Processes
                        </button>
                    )}
                    <br></br>
                    <div className="cyber-divider"></div>
                </div>

                {/* GRID OF CARDS */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '30px',
                    justifyContent: 'center', maxWidth: '1400px', width: '100%',
                    padding: '0 20px 80px 20px'
                }}>
                    {filteredCoins.map(coin => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;