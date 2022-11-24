import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
    showCart: false, cartProducts: [], quantity: 0, showNotification: {}, changed: false
}
const cartSlice = createSlice({
    name: 'cart-slice',
    initialState: cartInitialState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart
        },
        replaceCartItem(state, {payload}) {
           
             state.quantity = payload.quantity
             state.cartProducts = payload.cartProducts
        },
        addtoCartItem(state, action) {
            state.quantity++
            const newItem = action.payload;
            state.changed = true
            const existingProduct = state.cartProducts.find(item => item.id === newItem.id)
            if (!existingProduct) {
                state.cartProducts.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                })
            }

            else {
                existingProduct.quantity++;
                existingProduct.total = existingProduct.total + newItem.price
            }

        },

        removeCartItem(state, action) {
            state.quantity--;
            const pId = action.payload;
            const existingProduct = state.cartProducts.find(item => item.id === pId)
            state.changed = true
            if (existingProduct.quantity === 1) {
                state.cartProducts = state.cartProducts.filter(item => item.id !== pId)
            }
            else {
                existingProduct.quantity--;
                existingProduct.total = existingProduct.total - existingProduct.price

            }
        },

        sendItemtoCart(state, { payload }) {
            const notification = payload
            // state.showNotification.status = notification.status
            // state.showNotification.title = notification.title
            // state.showNotification.message = notification.message
            state.showNotification = { ...notification }

        }
    }
})

export const fetchCartdata = () => {
    return async (dispatch) => {

        const response = await fetch('https://react-redux-b63a7-default-rtdb.firebaseio.com/cart.json')
        if (!response.ok) {
            return dispatch(cartActions.sendItemtoCart({
                status: "failed",
                title: "failed",
                message: "fetching cart item failed"
            }))
        }

        const data = await response.json();
        console.log(data)
        dispatch(cartActions.replaceCartItem(data))
        dispatch(cartActions.sendItemtoCart({
            status: "success",
            title: "success",
            message: "fetching cart item succeed"
        }))




    }
}
export const sendCartData = (cart) => {

    return async (dispatch) => {
        await fetch('https://react-redux-b63a7-default-rtdb.firebaseio.com/cart.json',
            {
                method: 'PUT', body: JSON.stringify({
                    quantity: cart.quantity,
                    cartProducts: cart.cartProducts
                })
            }).then(response => {

                dispatch(cartActions.sendItemtoCart(
                    {
                        status: "success",
                        title: "susccess",
                        message: "Item has been sent"
                    }
                ))


            }).catch(error => {
                dispatch(cartActions.sendItemtoCart({
                    status: "failed",
                    title: "failed",
                    message: "Item has not been sent!"
                }))
            })


    }

}
const store = configureStore({
    reducer: { cart: cartSlice.reducer }
})

export const cartActions = cartSlice.actions
export default store