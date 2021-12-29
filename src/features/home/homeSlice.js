import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statusPopup: false,
    loadingSend: false,
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        handlePopupCV: (state, action) => {
            state.statusPopup = action.payload
        },
        handleLoadingSendCV: (state, action) => {
            state.statusPopup = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { handlePopupCV, handleLoadingSendCV } = homeSlice.actions

export default homeSlice.reducer