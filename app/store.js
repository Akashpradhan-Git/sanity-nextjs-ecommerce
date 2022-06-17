import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        quantity: auth,
        cart: cartSlice
    },
})