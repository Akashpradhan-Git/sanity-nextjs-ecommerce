import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export const { increment, decrement } = authSlice.actions
export default authSlice.reducer



