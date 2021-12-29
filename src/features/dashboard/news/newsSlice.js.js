import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newsList: [],
    callbackGet: false,
    newsUpdate: {}
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        CallBackGetNews: (state, action) => {
            state.callbackGet = !state.callbackGet
        },
        getNewsUpdate: (state, action) => {
            state.newsUpdate = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { CallBackGetNews, getNewsUpdate } = newsSlice.actions

export default newsSlice.reducer