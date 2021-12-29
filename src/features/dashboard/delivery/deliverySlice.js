import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryList: [],
    callbackGet: false,
    deliveryUpdate: {}
}

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        CallBackGetDelivery: (state, action) => {
            state.callbackGet = !state.callbackGet
        },
        getDeliveryUpdate: (state, action) => {
            state.deliveryUpdate = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { AddDelivery, CallBackGetDelivery, getDeliveryUpdate } = deliverySlice.actions

export default deliverySlice.reducer