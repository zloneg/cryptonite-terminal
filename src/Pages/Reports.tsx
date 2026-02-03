import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../Redux/store';
import reportService from '../Services/ReportService';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Reports.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NEON_COLORS = ['#00f2ff', '#FFD700', '#ff00ff', '#00ff00', '#ffffff'];

function Reports() {
  const selectedIds = useSelector((state: RootState) => state.coins.selectedCoinIds);
  const [priceHistory, setPriceHistory] = useState<any>({});
  const [labels, setLabels] = useState<string[]>([]);
  const [currentPrices, setCurrentPrices] = useState<any>({});
  const [targets, setTargets] = useState<any>({}); 
  const [tempMin, setTempMin] = useState<any>({});
  const [tempMax, setTempMax] = useState<any>({});

  const audioRef = useRef(new Audio('/alert.mp3'));

  useEffect(() => {
    if (selectedIds.length === 0) return;

    const fetchData = async () => {
        try {
            const data = await reportService.getPrices(selectedIds);
            const now = new Date().toLocaleTimeString();
            setCurrentPrices(data);
            setLabels(prev => [...prev.slice(-19), now]);

            setPriceHistory((prev: any) => {
                const newState = { ...prev };
                Object.keys(data).forEach(symbol => {
                    const price = data[symbol].USD;
                    if (!newState[symbol]) newState[symbol] = [];
                    newState[symbol] = [...newState[symbol].slice(-19), price];

                    if (targets[symbol]) {
                        const { min, max } = targets[symbol];
                        if (min && price <= min) {
                            audioRef.current.play().catch(() => {});
                            alert(`🚨 ALERT: ${symbol} FELL BELOW MIN ($${price})`);
                            setTargets({...targets, [symbol]: { ...targets[symbol], min: null }});
                        }
                        if (max && price >= max) {
                            audioRef.current.play().catch(() => {});
                            alert(`🚀 ALERT: ${symbol} BROKE ABOVE MAX ($${price})`);
                            setTargets({...targets, [symbol]: { ...targets[symbol], max: null }});
                        }
                    }
                });
                return newState;
            });
        } catch (err) { console.error("Link unstable..."); }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [selectedIds, targets]);

  const saveRange = (symbol: string) => {
    setTargets({
        ...targets,
        [symbol]: { min: Number(tempMin[symbol]) || null, max: Number(tempMax[symbol]) || null }
    });
    alert(`System: Thresholds for ${symbol} synchronized.`);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#00f2ff', font: { family: 'Orbitron' } } }
    },
    scales: { 
        y: { 
            grid: { color: '#1a1a1a' }, 
            ticks: { color: '#00f2ff', font: { family: 'Courier New' } },
            beginAtZero: false 
        }, 
        x: { grid: { color: '#1a1a1a' }, ticks: { color: '#444', font: { family: 'Courier New' } } } 
    }
  };

  return (
    <div className="page-container">
      <div className="title-wrapper">
        <div className="live-pulse"></div>
        <h1 className="section-title">Live_Market_Stream</h1>
      </div>
      <p className="system-status-text">
        SYSTEM_MONITOR: <span style={{ color: '#00ff00' }}>ACTIVE</span> // 
        AUDIO_ALERTS: <span style={{ color: '#00ff00' }}>ARMED</span>
      </p><br></br><br></br>
      
      <div className="alert-instruction">
    <span className="bell-icon">🔔</span>
    IF THE PRICE GOES BEYOND THE SPECIFIED LIMITS, YOU WILL RECEIVE AN AUDIO ALERT
</div><br></br><br></br>
      

      {selectedIds.length === 0 ? (
        <div className="no-selection-msg"><h3>SYSTEM_OFFLINE</h3></div>
      ) : (
        <>
            <div className="cyber-grid" style={{ marginBottom: '50px' }}>
                {selectedIds.map((symbol, index) => (
                    <div key={symbol} className="price-ticker">
                        <span className="ticker-name" style={{ color: NEON_COLORS[index % NEON_COLORS.length] }}>{symbol}</span>
                        <span className="ticker-price">
                            {currentPrices[symbol] ? `$${currentPrices[symbol].USD.toLocaleString()}` : "---"}
                        </span>
                        <div className="range-group">
                            <input type="number" placeholder="MIN_LIMIT $" className="ticker-alert-input" 
                                   onChange={(e) => setTempMin({...tempMin, [symbol]: e.target.value})} />
                            <input type="number" placeholder="MAX_LIMIT $" className="ticker-alert-input" 
                                   onChange={(e) => setTempMax({...tempMax, [symbol]: e.target.value})} />
                            <button className="set-range-btn" onClick={() => saveRange(symbol)}>Sync Range</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cyber-divider"></div>

            {/* SECOND POINT AND TITLE */}
            <div className="title-wrapper">
                <div className="live-pulse"></div>
                <h1 className="section-title" style={{ fontSize: '1.2rem' }}>Analytics_Visualization</h1>
            </div><br></br><br></br>

            <div className="chart-container">
                <div style={{ height: '450px' }}>
                    <Line data={{
                        labels: labels,
                        datasets: Object.keys(priceHistory).map((symbol, index) => ({
                            label: symbol,
                            data: priceHistory[symbol],
                            borderColor: NEON_COLORS[index % NEON_COLORS.length],
                            backgroundColor: 'transparent',
                            tension: 0.3,
                            pointRadius: 2
                        }))
                    }} options={chartOptions} />
                </div>
            </div>
        </>
      )}
    </div>
  );
}

export default Reports;