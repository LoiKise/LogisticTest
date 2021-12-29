import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderList: [],
    callbackGet: false,
    orderUpdate: {},
    orderView: [],
    statusOrderView: false
}

export const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        CallBackGetOrder: (state, action) => {
            state.callbackGet = !state.callbackGet
        },
        getOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload
        },
        getOrderView: (state, action) => {
            state.orderView = action.payload
            state.statusOrderView = true

        },
        closeStatusView: (state, action) => {
            state.statusOrderView = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { AddOrder, CallBackGetOrder, getOrderUpdate, getOrderView, closeStatusView } = orderSlice.actions

export default orderSlice.reducer