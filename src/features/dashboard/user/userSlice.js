import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList: [],
    callbackGet: false,
    userUpdate: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        CallBackGetUser: (state, action) => {
            state.callbackGet = !state.callbackGet
        },
        getUserUpdate: (state, action) => {
            state.userUpdate = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { AddUser, CallBackGetUser, getUserUpdate } = userSlice.actions

export default userSlice.reducer