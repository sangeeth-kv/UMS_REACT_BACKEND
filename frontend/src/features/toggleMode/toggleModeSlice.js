import {createSlice} from "@reduxjs/toolkit"


const savedMode=localStorage.getItem("theme_mode") || "light"

export const toggleModeSlice=createSlice({
    name:"toggle",
    initialState:{
        mode:savedMode
    },
    reducers:{
        toggleMode:(state)=>{
            state.mode=state.mode==="light"?"dark":"light"
            localStorage.setItem("theme_mode",state.mode)
        }
    }
})

export const {toggleMode}=toggleModeSlice.actions
export default toggleModeSlice.reducer