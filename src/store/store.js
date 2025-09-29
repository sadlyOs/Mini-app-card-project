import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filtredSlice"

const store = configureStore({
    reducer: {
        filter: filterReducer
    }
})

console.log(store);


export default store;