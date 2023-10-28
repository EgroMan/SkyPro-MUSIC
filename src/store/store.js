import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/todo"


export default configureStore({
    reducer:{
        track: playerReducer
    },
});