import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger"

const signinUser=async (userData)=>{
    try {
        const response = await axiosInstance.post(API_ROUTES.SIGNIN, userData);
        return response.data;
    } catch (error) {
        log.warn("Signin error:", error);
        if(error.response){
        return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }
}

export default signinUser