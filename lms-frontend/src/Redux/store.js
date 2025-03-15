import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";

const myStore = configureStore({
    reducer:{
        books:reducer
    }
})

export default myStore;