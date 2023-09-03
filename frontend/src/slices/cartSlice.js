import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/cartUtils";

const initialState = localStorage.getItem("cart") ? 
    JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };



const cardSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
            return updateCart(state);
        },
    },
});

export const { addToCart, removeFromCart } = cardSlice.actions;

export default cardSlice.reducer;