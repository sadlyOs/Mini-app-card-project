import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filtredSlice"
import gameReducer from "./gameSlice"

const store = configureStore({
    reducer: {
        filter: filterReducer,
        game: gameReducer
    }
})

console.log(store);


export default store;