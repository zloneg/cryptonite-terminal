import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../Redux/store';
import { toggleCoin, closeDialog } from '../Redux/CoinSlice';

function CoinDialog() {
    const dispatch = useDispatch();
    const { isDialogOpen, selectedCoinIds } = useSelector((state: RootState) => state.coins);

    if (!isDialogOpen) return null; 

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '30px', borderRadius: '15px',
                width: '400px', textAlign: 'center', boxShadow: '0 0 20px gold'
            }}>
                <h3>Maximum 5 coins reached</h3>
                <p>Please remove one coin from the list to add a new one:</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
                    {selectedCoinIds.map(id => (
                        <li key={id} style={{ 
                            display: 'flex', justifyContent: 'space-between', 
                            padding: '10px', borderBottom: '1px solid #eee' 
                        }}>
                            <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{id}</span>
                            <button 
                                onClick={() => dispatch(toggleCoin(id))}
                                style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={() => dispatch(closeDialog())}
                    style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default CoinDialog;