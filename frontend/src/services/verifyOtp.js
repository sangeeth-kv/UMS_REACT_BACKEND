import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger"

async function verifyOtp(otp) {
    try {
        const response=await axiosInstance.post(API_ROUTES.VERIFY_OTP,otp)
        return response.data
    } catch (error) {
        log.error("Error in the verify otp : ",error)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }
}

export default verifyOtp