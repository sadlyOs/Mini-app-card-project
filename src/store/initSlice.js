import { createSlice } from "@reduxjs/toolkit";

const initSlice = createSlice({
    name: "init",
    initialState: {
        user: null
    },

    reducers: {
        init(state, action) {
            state.user = action.payload
        }
    }
})

export const { init } = initSlice.actions
export default initSlice.reducer
