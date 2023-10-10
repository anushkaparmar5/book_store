import { configureStore } from '@reduxjs/toolkit'

import cartSlice from '../CartSlice/cartSlice';

export const Store = configureStore({
    reducer: {
        cart: cartSlice,
    }
});