import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CoinState {
    searchTerm: string;
    selectedCoinIds: string[];
    isDialogOpen: boolean;
    pendingCoinId: string | null;
}

const initialState: CoinState = {
    searchTerm: "",
    selectedCoinIds: JSON.parse(localStorage.getItem("selectedCoins") || "[]"),
    isDialogOpen: false,
    pendingCoinId: null
};

const coinSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        toggleCoin: (state, action: PayloadAction<string>) => {
            const symbol = action.payload.toUpperCase();
            if (state.selectedCoinIds.includes(symbol)) {
                state.selectedCoinIds = state.selectedCoinIds.filter(s => s !== symbol);
            } else {
                if (state.selectedCoinIds.length < 5) {
                    state.selectedCoinIds.push(symbol);
                } else {
                    state.isDialogOpen = true;
                    state.pendingCoinId = symbol;
                }
            }
            localStorage.setItem("selectedCoins", JSON.stringify(state.selectedCoinIds));
        },
        closeDialog: (state) => {
            state.isDialogOpen = false;
            state.pendingCoinId = null;
        },
        // RESET FUNCTION
        clearAllSelected: (state) => {
            state.selectedCoinIds = [];
            localStorage.setItem("selectedCoins", JSON.stringify([]));
        }
    }
});

export const { setSearchTerm, toggleCoin, closeDialog, clearAllSelected } = coinSlice.actions;
export default coinSlice.reducer;