import {configureStore} from "@reduxjs/toolkit";
import toggleReducer from "../features/toggleMode/toggleModeSlice"

console.log("this is toggle reducer : ",toggleReducer)

export default configureStore({
    reducer:{
        toggle:toggleReducer,
    }
})