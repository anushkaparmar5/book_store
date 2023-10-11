// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    currentUser: {
        userId: 1,
        userName: "test"
    },
    message: { text: "", type: "" },
    cartLoading: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let item = action.payload;
            state.cartLoading = true;
            const existingItem = state.cartItems.find(_item => _item._id === item._id && _item?.userId === state.currentUser.userId);
            if (existingItem) {
                state.cartLoading = false;
                state.cartItems = state.cartItems.map((currentItem) => parseInt(currentItem._id) === item?._id && parseInt(currentItem?.userId) === state.currentUser.userId ? { ...currentItem, quantity: currentItem?.quantity + 1 } : currentItem);
                state.message = { text: "Item already in cart and update quantity for this item", type: "warning" };
            } else {
                state.cartItems.push({ ...action.payload, userId: state.currentUser.userId, quantity: 1 });
                state.message = { text: "Item added to cart", type: "success" };
                state.cartLoading = false;
            }
        },
        removeFromCart: (state, action) => {
            state.cartLoading = true;
            const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id || item.userId !== state.currentUser.userId);
            if (updatedCartItems.length === state.cartItems.length) {
                state.message = { text: "Item not found in cart", type: "error" };
                state.cartLoading = false;
            } else {
                state.cartItems = updatedCartItems;
                state.message = { text: "Item removed from cart", type: "success" };
                state.cartLoading = false;
            }
        },
        updateQuantity: (state, action) => {
            state.cartLoading = true;
            const { _id, userId, quantity } = action.payload;
            state.cartItems = state.cartItems.map((item) => parseInt(item._id) === _id && parseInt(userId) === state.currentUser.userId ? { ...item, quantity } : item);
            state.message = { text: "Cart updated", type: "success" };
            state.cartLoading = false;
        },
        clearMessage: (state) => {
            state.message = { text: "", type: "" };
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
