import { configureStore } from '@reduxjs/toolkit'

import bookSlice from '../BookSlics/BookSlics'

export const Store = configureStore({
    reducer: {
        users: bookSlice

    }
});