import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCrypto: "ETH",
    selectedCrypto: "BTC",
    value: 1,
    xRate: 0,
    quantity: 1,
    isBuying: null,
    buyBook: [],
    sellBook: []
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setCrypto: (state, action) => {
            state.currentCrypto = action.payload.toUpperCase();
        },
        sellFor: (state, action) => {
            state.xRate = (1 * action.payload) * state.quantity;
            state.isBuying = false;
        },        
        buyFor: (state, action) => {
            state.xRate = (1 / action.payload);
            state.isBuying = true;
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        setBuyBook: (state, action) => {
            state.buyBook = [...state.buyBook, action.payload];
            console.log("buyBook payload: ", action.payload);
        }
    }
})

export const {
    setCrypto,
    sellFor,
    buyFor,
    setQuantity,
    setBuyBook
} = orderSlice.actions;

export default orderSlice.reducer;