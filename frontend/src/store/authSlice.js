import { createSlice } from "@reduxjs/toolkit";
// import log  from "../utils/logger"


const initialState={
    accessToken:null,
    user:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAccessToken:(state,action)=>{
            // log.degbug(`state : >>>> ${state}`)
            state.accessToken=action.payload
        },
        clearAccessTokne:(state)=>{
            state.accessToken=null;
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        clearUser:(state)=>{
            state.user=null
        },
        updateUser: (state, action) => {
            if (state.user) {
            state.user = {
                ...state.user,
                ...action.payload
            };
        }
    }
    }
})

export const{setAccessToken, clearAccessToken, setUser, clearUser,updateUser}=authSlice.actions

export default authSlice.reducer