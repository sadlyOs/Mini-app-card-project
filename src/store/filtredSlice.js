import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        items: [],
        currency: 'ton'
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
        },

        editCurrency: (state, action) => {
            state.currency = action.payload
        }
    }
})

export const { addItem, removeItem, removeAll, editCurrency } = filterSlice.actions
export default filterSlice.reducer