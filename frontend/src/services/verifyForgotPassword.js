import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger"

export default async function verifyForgotPassword(data,token) {
    try {
        console.log("tkn",token)
        const response=await axiosInstance.post(`${API_ROUTES.VERIFY_FORGOT_PASSWORD}/${token}`,data)
        return response.data
    } catch (error) {
    log.error("Error in the update email : ",error)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        } 
    }
}