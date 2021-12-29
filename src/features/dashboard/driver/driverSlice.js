import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    driverList: [],
    callbackGet: false,
    driverUpdate: {}
}

export const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        CallBackGetDriver: (state, action) => {
            state.callbackGet = !state.callbackGet
        },
        getDriverUpdate: (state, action) => {
            state.driverUpdate = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { AddDriver, CallBackGetDriver, getDriverUpdate } = driverSlice.actions

export default driverSlice.reducer