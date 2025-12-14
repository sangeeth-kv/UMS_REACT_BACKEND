import {configureStore} from "@reduxjs/toolkit";
import toggleReducer from "../features/toggleMode/toggleModeSlice"
import authReducer from "../store/authSlice"


export default configureStore({
    reducer:{
        toggle:toggleReducer,
        auth:authReducer
    }
})