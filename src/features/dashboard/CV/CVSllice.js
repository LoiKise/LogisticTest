import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  CVList: [],
  callbackGet: false,
}

export const CVSlice = createSlice({
  name: 'CV',
  initialState,
  reducers: {
    CallBackGetCV: (state, action) => {
      state.callbackGet = !state.callbackGet
    },
  },
})

// Action creators are generated for each case reducer function
export const { CallBackGetCV } = CVSlice.actions

export default CVSlice.reducer