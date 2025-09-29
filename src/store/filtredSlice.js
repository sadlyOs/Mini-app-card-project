import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            console.log(action.payload);
            state.items = [...action.payload];
        },

        removeItem: (state, action) => {
            const filtred = state.items.filter(item => item.toLowerCase() !== action.payload.toLowerCase())
            state.items = filtred;
        },

        removeAll: (state) => {
            console.log('del');

            state.items = [];
        }
    }
})

export const { addItem, removeItem, removeAll } = filterSlice.actions
export default filterSlice.reducer