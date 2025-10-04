import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filtredSlice"
import gameReducer from "./gameSlice"
import initReducer from "./initSlice"

const store = configureStore({
    reducer: {
        filter: filterReducer,
        game: gameReducer,
        init: initReducer
    }
})

console.log(store);


export default store;