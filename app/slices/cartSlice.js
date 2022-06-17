import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        quantity: 0,
        total: 0,
        showCart: false
    },
    reducers: {
        addToCart: (state, action) => {

            const product = action.payload
            const cart = state.cart
            const index = cart.findIndex((item) => item._id === product._id)
            if (index === -1) {
                cart.push({
                    ...product,
                    quantity: 1
                }),
                    state.quantity = 1
            } else {
                cart[index].quantity++
                state.quantity++
            }
            state.cart = cart
            state.total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
            toast.success('Product added to cart')
        },
        removeFromCart: (state, action) => {
            const product = action.payload
            const cart = state.cart
            const cartItem = cart.filter((item) => item._id !== product._id)
            state.cart = cartItem
        },
        emptyCart: (state) => {
            state.cart = []
            state.quantity = 0
            state.total = 0
        },

        quantityIncrement: (state, action) => {
            const product = action.payload
            const cart = state.cart
            const index = cart.findIndex((item) => item._id === product._id)
            cart[index].quantity++
            state.quantity++
            state.total += product.price
            state.cart = cart
        },
        quantityDecrement: (state, action) => {
            const product = action.payload
            console.log(product)

            if (product.quantity === 1) {
                alert('Product quantity cannot be 0')
                return
            }
            const cart = state.cart
            const index = cart.findIndex((item) => item._id === product._id)
            cart[index].quantity--
            state.quantity--
            state.total -= product.price
            state.cart = cart

        },

        toggleCart: (state) => {
            state.showCart = !state.showCart
        }

    }
})

export const { addToCart, toggleCart, quantityIncrement, quantityDecrement, removeFromCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer