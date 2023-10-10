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
            console.log('state, action :>> ', state, action);
            state.cartLoading = true;
            // const item = state.cartItems.find((item) => item._id === action?.payload?._id);
            // console.log('item :>> ', item);
            // console.log('state :>> ', state?.currentUser?.userId);
            // if (existingItem) {
            //     state.message = { text: "Item already in cart", type: "warning" };
            //     state.cartLoading = false;
            // } else {
            state.cartItems.push({ ...action.payload, userId: state.currentUser.userId });
            state.message = { text: "Item added to cart", type: "success" };
            state.cartLoading = false;
            // }
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
            const item = state.cartItems.find((item) => parseInt(item._id) === _id && parseInt(userId) === state.currentUser.userId);
            if (item) {
                item.quantity = quantity;
                state.message = { text: "Cart updated", type: "success" };
                state.cartLoading = false;
            } else {
                state.message = { text: "Item not found in cart", type: "success" };
                state.cartLoading = false;
            }
        },
        clearMessage: (state) => {
            state.message = { text: "", type: "" };
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
