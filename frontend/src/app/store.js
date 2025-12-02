import {configureStore} from "@reduxjs/toolkit";
import toggleReducer from "../features/toggleMode/toggleModeSlice"


export default configureStore({
    reducer:{
        toggle:toggleReducer,
    }
})